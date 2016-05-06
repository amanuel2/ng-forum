(function (angular) {
    var app = angular.module('ForumApp')

    app.controller('topicCtrl', ["$scope", "$stateParams", "refService", "currentAuth", "dateService", "timeService","$mdMedia","$mdDialog","replyService","$firebaseObject","$state", topicCtrl])


    function topicCtrl($scope, $stateParams, refService, currentAuth, dateService, timeService,$mdMedia,$mdDialog,replyService,$firebaseObject,$state) {
        //SETTING INFO
        $scope.creatorAvatar = $stateParams.AVATAR;
        $scope.creatorTitle = $stateParams.TITLE;
        $scope.creatorUID = $stateParams.UID;
        $scope.creatorUsername = $stateParams.USERNAME;
        $scope.creatorValue = $stateParams.VALUE;
        $scope.creatorDate = $stateParams.DATE;
        $scope.creatorEmail = $stateParams.EMAIL;
        $scope.timeSinceCreated = timeService.getTimeF(new Date(parseInt($scope.creatorDate)));
        var dateCheck = new Date(parseInt($scope.creatorDate));
        $scope.creatorDate = timeService.getTimeF(dateCheck);

        //Setting Views
            //Adding Them..
                $scope.views = $firebaseObject(refService.ref().child("Topics"))
                refService.ref().child("Topics").once("value", function(snapshot) {
                    
                    snapshot.forEach(function(childSnapshot) {
                      var key = childSnapshot.key();
                      var childData = childSnapshot.val();
                        if(childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL){
                            refService.ref().child("Topics").child(childData.pushKey).child("Views").child(currentAuth.uid).set({
                                Views : true
                            })
                        }
                    })
                })
            //Viewing them
              refService.ref().child("Topics").once("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                      var key = childSnapshot.key();
                      var childData = childSnapshot.val();
                      if(childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL){
                            refService.ref().child("Topics").child(childData.pushKey).child("Views").on("value", function(snapshot){
                                $scope.countViews = snapshot.numChildren();
                            })
                        }
                    })
                })
                
                
        //Setting Voting
            //Adding them...
                $scope.upVote = function(){
                    $scope.views = $firebaseObject(refService.ref().child("Topics"))
                        refService.ref().child("Topics").once("value", function(snapshot) {
                            
                            snapshot.forEach(function(childSnapshot) {
                              var key = childSnapshot.key();
                              var childData = childSnapshot.val();
                                if(childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL){
                                    refService.ref().child("Topics").child(childData.pushKey).child("UpVotes").child(currentAuth.uid).set({
                                        Vote : 1
                                    })
                                }
                            })
                        })
                }
                
                $scope.downVote = function(){
                    $scope.views = $firebaseObject(refService.ref().child("Topics"))
                        refService.ref().child("Topics").once("value", function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                              var key = childSnapshot.key();
                              var childData = childSnapshot.val();
                                if(childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL){
                                    refService.ref().child("Topics").child(childData.pushKey).child("DownVotes").child(currentAuth.uid).set({
                                        Vote : -1
                                    })
                                }
                            })
                        })
                        
                }
                
            //Viewing Them..
                $scope.votesViewing = $firebaseObject(refService.ref().child("Topics"))
                        refService.ref().child("Topics").once("value", function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                              var key = childSnapshot.key();
                              var childData = childSnapshot.val();
                                if(childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL){
                                    refService.ref().child("Topics").child(childData.pushKey).child("DownVotes").on("value", function(snapshot){
                                        $scope.downVoteCount = snapshot.numChildren();
                                        console.log(snapshot.val());
                                        refService.ref().child("Topics").child(childData.pushKey).child("UpVotes").on("value", function(snapshotUpVote){
                                            $scope.upVoteCount = snapshotUpVote.numChildren();
                                            console.log(snapshotUpVote.val())
                                            console.log("VALUE : " +  ($scope.upVoteCount - $scope.downVoteCount))
                                            $scope.votesCount = ($scope.upVoteCount - $scope.downVoteCount);
                                        });
                                    })
                                }
                            })
                        })
             
             
        //SETTING REPLIES

        $scope.replies = $firebaseObject(refService.ref().child("Replies").child($scope.creatorUsername + $stateParams.DATE))
        
        //Getting ClickProfile Set Up...
        $scope.goToProfile = function(info){
            $state.go("authHome.otherUser", 
                {
                    "DATE" : info.replyCreatorDate,
                    "UID" : info.replyCreatorUID
                }
            )
        }
        
        
        $scope.replyTopic = function (ev) {
            replyService.setTopicInfo($scope.creatorAvatar,$scope.creatorTitle,$scope.creatorUID,$scope.creatorUsername,
                                        $scope.creatorValue , $stateParams.DATE , $scope.creatorEmail, $scope.timeSinceCreated,
                                            $scope.creatorAvatar);
            if (ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'newReplyCtrl',
                        templateUrl: 'views/newReply.html',
                        parent: angular.element(document.body),
                        resolve: {
                            // controller will not be loaded until $waitForAuth resolves
                            // Auth refers to our $firebaseAuth wrapper in the example above
                            "currentAuth": ["refService", function (refService) {
                                // $waitForAuth returns a promise so the resolve waits for it to complete
                                return refService.refAuth().$requireAuth();
                            }]
                        },
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                    .then(function (answer) {
                        //Then Argument
                    }, function () {
                        //Canceled Dialog
                    });
            }
            else {
                return null;
            }
        }
    }
})(angular);