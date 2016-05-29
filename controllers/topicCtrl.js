(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('topicCtrl', ["$scope", "$stateParams", "refService", "currentAuth","editReplyService", "dateService", "timeService", "$mdMedia", "$mdDialog", "replyService", "$firebaseObject", "$state","otherUserService","editTopicService", topicCtrl])


    function topicCtrl($scope, $stateParams, refService, currentAuth, editReplyService,dateService, timeService, $mdMedia, $mdDialog, replyService, $firebaseObject, $state,otherUserService,editTopicService) {
        //SETTING INFO
        refService.ref().child("Topics").on("value", function(snapshot){
            snapshot.forEach(function(EVEN){
                var key = EVEN.key();
                var childData = EVEN.val();
                
                if(childData.Postnum == $stateParams.POST){
                    $scope.creatorAvatar = childData.Avatar
                    $scope.creatorTitle = childData.Title;
                    $scope.creatorUID = childData.UID;
                    $scope.creatorUsername = childData.Username;
                    $scope.creatorValue = childData.Value;
                    $scope.creatorDate = childData.DateCreated;
                    $scope.creatorEmail = childData.Email;
                    $scope.timeSinceCreated = timeService.getTimeF(new Date(parseInt($scope.creatorDate)));
                    var dateCheck = new Date(parseInt($scope.creatorDate));
                    $scope.creatorDateParsed = timeService.getTimeF(dateCheck);
                }
            })
        })
        

        //Setting Views
        //Adding Them..
        $scope.views = $firebaseObject(refService.ref().child("Topics"))
        refService.ref().child("Topics").once("value", function(snapshot) {

                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if (childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL) {
                        refService.ref().child("Topics").child(childData.pushKey).child("Views").child(currentAuth.uid).set({
                            Views: true
                        })
                    }
                })
            })
            //Viewing them
        refService.ref().child("Topics").once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key();
                var childData = childSnapshot.val();
                if (childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL) {
                    refService.ref().child("Topics").child(childData.pushKey).child("Views").on("value", function(snapshot) {
                        $scope.countViews = snapshot.numChildren();
                    })
                }
            })
        })


        //Setting Voting
        //Adding them...
        $scope.upVote = function() {
            $scope.views = $firebaseObject(refService.ref().child("Topics"))
            refService.ref().child("Topics").once("value", function(snapshot) {

                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if (childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL) {
                        refService.ref().child("Topics").child(childData.pushKey).child("UpVotes").child(currentAuth.uid).set({
                            Vote: 1
                        })
                    }
                })
            })
        }

        $scope.downVote = function() {
            $scope.views = $firebaseObject(refService.ref().child("Topics"))
            refService.ref().child("Topics").once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if (childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL) {
                        refService.ref().child("Topics").child(childData.pushKey).child("DownVotes").child(currentAuth.uid).set({
                            Vote: -1
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
                if (childData.DateCreated == $stateParams.DATE && childData.Email == $stateParams.EMAIL) {
                    refService.ref().child("Topics").child(childData.pushKey).child("DownVotes").on("value", function(snapshot) {
                        $scope.downVoteCount = snapshot.numChildren();
                        console.log(snapshot.val());
                        refService.ref().child("Topics").child(childData.pushKey).child("UpVotes").on("value", function(snapshotUpVote) {
                            $scope.upVoteCount = snapshotUpVote.numChildren();
                            console.log(snapshotUpVote.val())
                            console.log("VALUE : " + ($scope.upVoteCount - $scope.downVoteCount))
                            $scope.votesCount = ($scope.upVoteCount - $scope.downVoteCount);
                        });
                    })
                }
            })
        })


        //SETTING REPLIES

        $scope.replies = $firebaseObject(refService.ref().child("Replies").child($scope.creatorUsername + $stateParams.DATE));
        $scope.actualReplyUser= $firebaseObject(refService.ref().child("UserAuthInfo").child($scope.creatorUID));

        //Getting ClickProfile Set Up...
        $scope.goToProfile = function(info, ev) {
            if (ev) {
                otherUserService.setUserInfo(info);
                otherUserService.ACTUALsetUserInfo($scope.actualReplyUser);
                    $mdDialog.show({
                            controller: 'otherUserProfileCtrl',
                            templateUrl: 'views/otherUserProfile.html',
                            parent: angular.element(document.body),
                            resolve: {
                                // controller will not be loaded until $waitForAuth resolves
                                // Auth refers to our $firebaseAuth wrapper in the example above
                                "currentAuth": ["refService", function(refService) {
                                    // $waitForAuth returns a promise so the resolve waits for it to complete
                                    return refService.refAuth().$requireAuth();
                                }]
                            },
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            },
                      $mdDialog.alert()
                            .openFrom({
                              top: -50,
                              width: 30,
                              height: 80
                            })
                            .closeTo({
                              left: 1500
                            })
                );
            } else {
                return null;
            }
            console.log(info);
        }
        
        $scope.editReply = function(ev,reps){
            if(ev){
                
                editReplyService.setInfo(
                                            $stateParams.USERNAME, 
                                            $stateParams.DATE, 
                                            currentAuth.uid);
                    $mdDialog.show({
                            controller: 'editReplyCtrl',
                            templateUrl: 'views/editReply.html',
                            parent: angular.element(document.body),
                            resolve: {
                                // controller will not be loaded until $waitForAuth resolves
                                // Auth refers to our $firebaseAuth wrapper in the example above
                                "currentAuth": ["refService", function(refService) {
                                    // $waitForAuth returns a promise so the resolve waits for it to complete
                                    return refService.refAuth().$requireAuth();
                                }]
                            },
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            },
                      $mdDialog.alert()
                            .openFrom({
                              top: -50,
                              width: 30,
                              height: 80
                            })
                            .closeTo({
                              left: 1500
                            })
                );
            }
            else{
                if(true)
                    return null;
            }
        }
        
        $scope.editValue = function(ev){
            
            if(ev){
                editTopicService.setDateCreated($stateParams.DATE);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'editTopicCtrl',
                        templateUrl: 'views/editTopic.html',
                        parent: angular.element(document.body),
                        resolve: {
                            // controller will not be loaded until $waitForAuth resolves
                            // Auth refers to our $firebaseAuth wrapper in the example above
                            "currentAuth": ["refService", function(refService) {
                                // $waitForAuth returns a promise so the resolve waits for it to complete
                                return refService.refAuth().$requireAuth();
                            }]
                        },
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                    .then(function(answer) {
                        //Then Argument
                    }, function() {
                        //Canceled Dialog
                    });
                
            }else{
                return null;
            }
        }

        $scope.funcCheckEDIT = function(reps){
            // console.log("CURRENT AUTH UID" + currentAuth.uid);
            // console.log("CREATOR UID " + $scope.creatorUID);
            if(currentAuth.uid == reps.replyCreatorUID){
                return true;
            }
                    
            else{
                return false;
            }      
        }
        $scope.goBackTopic = function(){
            $state.go('authHome.desc')
        }
        
        $scope.replyUserSec = function(rep){
            if(currentAuth.uid == rep.replyCreatorUID)
                return true;
            
            else
                return false;
        }
        $scope.replyTopic = function(ev) {
            replyService.setTopicInfo($scope.creatorAvatar, $scope.creatorTitle, $scope.creatorUID, $scope.creatorUsername,
                $scope.creatorValue, $stateParams.DATE, $scope.creatorEmail, $scope.timeSinceCreated,
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
                            "currentAuth": ["refService", function(refService) {
                                // $waitForAuth returns a promise so the resolve waits for it to complete
                                return refService.refAuth().$requireAuth();
                            }]
                        },
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                    .then(function(answer) {
                        //Then Argument
                    }, function() {
                        //Canceled Dialog
                    });
            } else {
                return null;
            }
        }
    }
})(angular);