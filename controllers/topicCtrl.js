(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('topicCtrl', ["$scope", "$stateParams", "refService", "editReplyService", "dateService", "$firebaseArray", "timeService","$mdBottomSheet", "$mdMedia", "$mdDialog", "replyService", "$firebaseObject", "$state", "otherUserService", "editTopicService", topicCtrl])


    function topicCtrl($scope, $stateParams, refService, editReplyService, dateService, $firebaseArray, timeService,$mdBottomSheet, $mdMedia, $mdDialog, replyService, $firebaseObject, $state, otherUserService, editTopicService) {
        var currentAuth = refService.ref().getAuth();
        $scope.currentAuthGet = refService.ref().getAuth();

        function generateUUID(length) {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * length) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        if ($scope.currentAuthGet) {
            
        }
        else {
            currentAuth = {
                uid : generateUUID(16)
            }
        }
        
        $scope.notAuthReplyTopic = function(){
              alertify.myAlert("Sorry , You must be logged in , to reply or have many feautres available.");
        }
        //SETTING INFO
        refService.ref().child("Topics").on("value", function(snapshot) {
            snapshot.forEach(function(EVEN) {
                var key = EVEN.key();
                var childData = EVEN.val();

                if (childData.Postnum == $stateParams.POST) {
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


            $scope.actualReplyUser = $firebaseObject(refService.ref().child("UserAuthInfo").child($scope.creatorUID));
        })


        //Setting Views
        //Adding Them..
        $scope.views = $firebaseObject(refService.ref().child("Topics"))
        refService.ref().child("Topics").once("value", function(snapshot) {

                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if ($stateParams.POST == childData.Postnum) {
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
                    if ($stateParams.POST == childData.Postnum) {
                        refService.ref().child("Topics").child(childData.pushKey).child("Views").on("value", function(snapshot) {
                            $scope.countViews = snapshot.numChildren();
                        })
                    }
                })
            })

       /* var viewsCount = $firebaseArray(refService.ref().child("Topics"));

        viewsCount.$loaded(function(data) {
            $scope.countViews = data.length;
            console.log(data)
        })*/




        function voteHelper() {
             $scope.didVote = true;
            refService.ref().child("Topics").once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    childSnapshot.forEach(function(viewsCheck) {
                        /*var keyCheck = viewsCheck.key();
                        var childDataCheck = viewsCheck.val();
                        console.log(childData.UpVotes);*/
                        refService.ref().child("Topics").child(childData.pushKey).child("Vote").on("value", function(snapshotViews) {
                            snapshotViews.forEach(function(snapShotViewsForEach) {
                                var keySNAPVIEWS = snapShotViewsForEach.key();
                                var childDataSNAPVIEWS = snapShotViewsForEach.val();

                                if (childDataSNAPVIEWS == currentAuth.uid) {
                                    $scope.didVote = true;
                                }
                            })
                        
                        })

                    })
                })
            })
            if ($scope.didVote == true) {
                return "Voted"
            }
            else {
                return "NotVoted"
            }
        }
        $scope.votedAlready = function() {
            if (voteHelper() == "Voted")
                return false;

            else
                return true;


        }

        //Setting Voting
        //Adding them...
        $scope.upVote = function() {
            refService.ref().child("Topics").once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if ($stateParams.POST == childData.Postnum) {
                        refService.ref().child("Topics").child(childData.pushKey).child("Vote").child(currentAuth.uid).set({
                            Vote: 1
                        })
                    }
                })
            })
            
            var upVoteIcon = document.getElementById("upVoteIcon");
            upVoteIcon.classList.remove("thumb-icon");
            upVoteIcon.classList.add("upvote");
            
            var downVoteIcon = document.getElementById("downVoteIcon");
            downVoteIcon.classList.remove("downvote");
            downVoteIcon.classList.add("thumb-icon");

        }

        $scope.downVote = function() {
            refService.ref().child("Topics").once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if ($stateParams.POST == childData.Postnum) {
                        refService.ref().child("Topics").child(childData.pushKey).child("Vote").child(currentAuth.uid).set({
                            Vote: -1
                        })
                    }
                })
            })
            
            var downVoteIcon = document.getElementById("downVoteIcon");
            downVoteIcon.classList.remove("thumb-icon");
            downVoteIcon.classList.add("downvote");
            
            var upVoteIcon = document.getElementById("upVoteIcon");
            upVoteIcon.classList.remove("upvote");
            upVoteIcon.classList.add("thumb-icon");

        }


    
    $scope.countVote = 0;
        //Viewing Them..
        $scope.votesViewing = $firebaseObject(refService.ref().child("Topics"))
        refService.ref().child("Topics").on("value", function(snapshot) {
            $scope.countVote = 0;
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key();
                var childData = childSnapshot.val();
                if ($stateParams.POST == childData.Postnum) {
                    refService.ref().child("Topics").child(childData.pushKey).child("Vote").on("value", function(snapshotVote) {
                        snapshotVote.forEach(function(VoteChild){
                            VoteChild.forEach(function(evenChildVote){
                                var keyCHILD = evenChildVote.key();
                                var childDataCHILD = evenChildVote.val();
                                $scope.countVote += ( childDataCHILD );
                            })
                        })
                    })
                }
            })
        })


      




        //SETTING REPLIES

        $scope.replies = $firebaseObject(refService.ref().child("Replies").child($scope.creatorUsername + $stateParams.POST));




        //Setting Tags..
        $scope.tagsTopic = $firebaseObject(refService.ref().child("Topics"));
        
        $scope.tagsTopic.$loaded(function(data){
            data.forEach(function(snapDataTag){
                
                if(snapDataTag.Postnum == $stateParams.POST){
                    
                    $scope.tagsTopicRep = snapDataTag.Tags;
                    
                }
            })
        })
        

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
            }
            else {
                return null;
            }
        }

        $scope.editReply = function(ev, reps) {
            if (ev) {
                editReplyService.setInfo(
                    reps.pushKey,
                    $stateParams.USERNAME,
                    $stateParams.POST,
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
            else {
                if (true)
                    return null;
            }
        }

        $scope.editValue = function(ev) {

            if (ev) {
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

            }
            else {
                return null;
            }
        }

        $scope.deletePost = function(rep) {
            alertify.confirm('Are you sure you want to delete your reply?', function() {
                refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).child(rep.pushKey)
                 .remove(function(error) {
                    if (error)
                        alertify.error("Deleting Failed : " + error);
                    else
                        alertify.success("Sucessfully Deleted!")
                })
            }, function() {
                alertify.warn('Canceled')
            });
        }


        /////////
        //https://ng-fourm-amanuel2.c9users.io/index.html#/authHome/topic/0/Amanuel
        $scope.urlSHARINGCURRENT = 'https://ng-fourm-amanuel2.c9users.io/index.html#/authHome/topic/' + $stateParams.POST + '/' + $stateParams.USERNAME

        $scope.openShareMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        //////////////////////////////////////////////////////////////////////  CHECK IF YOUR SUPOSE TO SEE  ICONS ////////////////////////////////////////////////////

        $scope.funcCheckEDIT = function(reps) {
            // console.log("CURRENT AUTH UID" + currentAuth.uid);
            // console.log("CREATOR UID " + $scope.creatorUID);
            if (currentAuth.uid == reps.replyCreatorUID) {
                return true;
            }

            else {
                return false;
            }
        }
        $scope.goBackTopic = function() {
            $state.go('authHome.desc')
        }

        $scope.replyUserSec = function(rep) {
            if (currentAuth.uid == rep.replyCreatorUID)
                return true;

            else
                return false;
        }
        
        $scope.isReplyable = function(rep){
            if (currentAuth.uid == rep.replyCreatorUID)
                return false;

            else
                return true;
        }
        $scope.isBestAnwser = function(rep) {
 
             if (rep.topicCreatorUID == rep.replyCreatorUID)
                  return false;

             else if(currentAuth.uid == rep.topicCreatorUID)
                  return true;
                
             else
                return false;
        }

        $scope.isLikeable = function(rep) {
            if (currentAuth.uid == rep.replyCreatorUID)
                return false;

            else
                return true;
        }
        
        $scope.isLikeable = function(rep) {
            if (currentAuth.uid == rep.replyCreatorUID)
                return false;

            else
                return true;
        }
        
        $scope.isShareble = function(rep) {
            if (true)
                return true;
            else
                return false;
        }

        $scope.isFlaggable = function(rep) {
            if (currentAuth.uid == rep.replyCreatorUID)
                return false;

            else
                return true;
        }
        $scope.isBookmarkable = function(rep) {
                 if ($scope.currentAuthGet) 
                    return true;

                else
                    return false;
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////****** TOGGLING ICONS ***** //////////////////////////////////////////////////////////////



        ////Check Box
        $scope.checkBoxNot = false;
        $scope.checkBoxYes = false;
        $scope.checkBoxTrueCheck = $firebaseArray(refService.ref().child("Topics"));
        
        function actualHelperYes(reps){
            $scope.inside;
            $scope.checkBoxTrueCheck.$loaded(function(CHECKINGTRUE){
                for(var i=0; i<CHECKINGTRUE.length; i++){
                    if(CHECKINGTRUE[i].Postnum == $stateParams.POST){
                        if(CHECKINGTRUE[i].IsAcceptedAnwser == true && CHECKINGTRUE[i].AcceptedAnwserReplyNum == reps.Replynum){
                            console.log(CHECKINGTRUE[i].AcceptedAnwserReplyNum , reps.Replynum);
                             $scope.inside =  true;
                        }
                        else{
                             $scope.inside = true;
                        }
                    }
                }
            })
            return $scope.inside;
        }
        $scope.checkFuncYes = function(reps){
            if(actualHelperYes(reps) == true){
                return true;
            }
            else{
                console.log(actualHelperYes(reps));
                return false;
            }
        }
        $scope.checkBoxTrueCheck.$loaded(function(CHECKINGTRUE){
                for(var i=0; i<CHECKINGTRUE.length; i++){
                    if(CHECKINGTRUE[i].Postnum == $stateParams.POST){
                        if(CHECKINGTRUE[i].IsAcceptedAnwser == true){
                            $scope.checkBoxYes = true;
                        }
                        else{
                             $scope.checkBoxNot = true;
                        }
                    }
                }
            })

        $scope.checkBoxNotNgClick = function(rep) {
            $scope.checkBoxYes = true;
            $scope.checkBoxNot = false;
            $scope.dataNot = $firebaseArray(refService.ref().child("Topics"));
            $scope.dataNot.$loaded(function(dataNoNgClick){
                for(var i=0; i<dataNoNgClick.length; i++){
                    if(dataNoNgClick[i].Postnum == $stateParams.POST){
                        refService.ref().child("Topics").child(dataNoNgClick[i].pushKey).update({
                            IsAcceptedAnwser:true,
                            AcceptedAnwserReplyNum : rep.Replynum
                        })
                    }
                }
            })
        }
        
        function bestAnwserImageIfHelper(){
            $scope.decicor;
            $scope.dataNot = $firebaseArray(refService.ref().child("Topics"));
             $scope.dataNot.$loaded(function(dataNoNgClick){
                for(var i=0; i<dataNoNgClick.length; i++){
                    if(dataNoNgClick[i].Postnum == $stateParams.POST){
                        refService.ref().child("Topics").child(dataNoNgClick[i].pushKey).on("value", function(snapshotChild){
                            if(snapshotChild.val().IsAcceptedAnwser == true){
                                $scope.decicor = true
                            }
                            else{
                                $scope.decicor = false
                            }
                        })
                        
                    }
                }
                
                if($scope.decicor == true){
                    return "True"
                }
                else{
                    return "Not"
                }
            })
        }
        $scope.bestAnwserImageIf = function(rep) {
            if(bestAnwserImageIfHelper() == "True"){
                return true;
            }
            else{
                return false;
            }
        }


        $scope.checkBoxNgClick = function(rep) {
            $scope.checkBoxYes = false;
            $scope.checkBoxNot = true;
            $scope.dataYes = $firebaseArray(refService.ref().child("Topics"));
            $scope.dataYes.$loaded(function(dataYesNgCLick){
                for(var i=0; i<dataYesNgCLick.length; i++){
                    if(dataYesNgCLick[i].Postnum == $stateParams.POST){
                        refService.ref().child("Topics").child(dataYesNgCLick[i].pushKey).update({
                            IsAcceptedAnwser:false,
                            AcceptedAnwserReplyNum : -1
                        })
                    }
                }
            })
        }

        ////Like
        $scope.likeBoxNo = true;
        $scope.likeBoxYes = false;

        $scope.likeBoxNoNgClick = function(rep) {
            $scope.likeBoxYes = true;
            $scope.likeBoxNo = false;
        }


        $scope.likeBoxYesNgClick = function(rep) {
            $scope.likeBoxYes = false;
            $scope.likeBoxNo = true;
        }

        
        //Bookmark
        $scope.bookmarkBoxNo = true;
        $scope.bookmarkBoxYes = false;

        $scope.bookmarkBoxNoNgClick = function(rep) {
            $scope.bookmarkBoxYes = true;
            $scope.bookmarkBoxNo = false;
        }


        $scope.bookmarkBoxYesNgClick = function(rep) {
            $scope.bookmarkBoxYes = false;
            $scope.bookmarkBoxNo = true;
        }


        $scope.replyTopic = function(ev) {
            replyService.setTopicInfo($scope.creatorAvatar, $scope.creatorTitle, $scope.creatorUID, $scope.creatorUsername,
                $scope.creatorValue, $stateParams.DATE, $scope.creatorEmail, $scope.timeSinceCreated,
                $scope.creatorAvatar, $stateParams.POST);
            if (ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdBottomSheet.show({
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
            }
            else {
                return null;
            }
        }
    }
})(angular);