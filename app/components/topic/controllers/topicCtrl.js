(function(angular) {

    'use strict';
    angular
        .module('ForumApp')
        .controller('topicCtrl', ["$scope","localStorageService","emojiListService", "$stateParams", "refService", "editReplyService", "dateService", "$firebaseArray", "timeService", "$mdBottomSheet", "$mdMedia", "$mdDialog", "replyService", "$firebaseObject", "$state", "otherUserService", "editTopicService", "topicLikesService", "badgesService", topicCtrl])


    function topicCtrl($scope,localStorageService,emojiListService, $stateParams, refService, editReplyService, dateService, $firebaseArray, timeService, $mdBottomSheet, $mdMedia, $mdDialog, replyService, $firebaseObject, $state, otherUserService, editTopicService, topicLikesService, badgesService) {
        var currentAuth = refService.ref().getAuth();
        $scope.currentAuthGet = refService.ref().getAuth();



        if($scope.currentAuthGet){
           if(localStorageService.get($stateParams.POST) == null);
           else 
               localStorageService.remove($stateParams.POST);
        }
        else{
            if(localStorageService.get($stateParams.POST) == null)
                localStorageService.set($stateParams.POST, generateUUID(16));
        }
            
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
                uid: localStorageService.get($stateParams.POST)
            }
        }

        if($scope.currentAuthGet == null) {
            $scope.currentAuthGet = {
                uid : localStorageService.get($stateParams.POST)
            }
        }
            
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function(code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code).value;
                }
                else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });








        $scope.notAuthReplyTopic = function() {
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
                    $scope.repliesNum = childData.RepliesNum;
                    $scope.timeSinceCreated = timeService.getTimeF(new Date(parseInt($scope.creatorDate)));
                    var dateCheck = new Date(parseInt($scope.creatorDate));
                    $scope.creatorDateParsed = timeService.getTimeF(dateCheck);
                }
            })


            $scope.actualReplyUser = $firebaseObject(refService.ref().child("UserAuthInfo").child($scope.creatorUID));
            $scope.thisUser = $firebaseObject(refService.ref().child("UserAuthInfo").child($scope.currentAuthGet.uid));
            $scope.isModerator;
            $scope.currentUserAvatar;
            $scope.thisUser.$loaded(function(data) {
                $scope.isModerator = data.Moderator;
                $scope.currentUserAvatar = data.Image;

            })
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

        $scope.scrollDownReply = function(){
                  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            }
        //Setting Voting
        //Adding them...
        function upVoteRegister(data) {
            $scope.TOTAL_POINTS = 0;
            refService.ref().child("UserAuthInfo").child($scope.creatorUID).child("PointsOBJ").child($scope.currentAuthGet.uid + "TOPIC:" + $stateParams.POST).set({
                Point: +5
            })
            refService.ref().child("UserAuthInfo").child($scope.creatorUID).child("PointsOBJ").once("value", function(downVoteCheck) {

                for (var i in downVoteCheck.val())
                    $scope.TOTAL_POINTS = $scope.TOTAL_POINTS + (downVoteCheck.val()[i].Point)

                refService.ref().child("UserAuthInfo").child($scope.creatorUID).update({
                    Points: $scope.TOTAL_POINTS
                })

            })

        }
        $scope.upVote = function() {
            refService.ref().child("Topics").once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if ($stateParams.POST == childData.Postnum) {
                        refService.ref().child("Topics").child(childData.pushKey).child("Vote").child(currentAuth.uid).set({
                            Vote: 1
                        })
                        upVoteRegister(childData);
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

        function downVotePointRegister(data) {
            $scope.TOTAL_POINTS = 0;
            refService.ref().child("UserAuthInfo").child($scope.creatorUID).child("PointsOBJ").child($scope.currentAuthGet.uid + "TOPIC:" + $stateParams.POST).set({
                Point: -2
            })
            refService.ref().child("UserAuthInfo").child($scope.creatorUID).child("PointsOBJ").once("value", function(downVoteCheck) {

                for (var i in downVoteCheck.val())
                    $scope.TOTAL_POINTS = $scope.TOTAL_POINTS + (downVoteCheck.val()[i].Point)

                refService.ref().child("UserAuthInfo").child($scope.creatorUID).update({
                    Points: $scope.TOTAL_POINTS
                })

            })

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
                        downVotePointRegister(childData);
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
                        snapshotVote.forEach(function(VoteChild) {
                            VoteChild.forEach(function(evenChildVote) {
                                var keyCHILD = evenChildVote.key();
                                var childDataCHILD = evenChildVote.val();
                                $scope.countVote += (childDataCHILD);
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

        $scope.tagsTopic.$loaded(function(data) {
            data.forEach(function(snapDataTag) {

                if (snapDataTag.Postnum == $stateParams.POST) {

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
                        templateUrl: 'app/components/otherUserProfile/otherUserProfile.html',
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
                        templateUrl: 'app/components/editReply/editReply.html',
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
                        templateUrl: 'app/components/editTopic/editTopic.html',
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



        $scope.urlSHARINGCURRENT = 'https://ng-fourm-amanuel2.c9users.io/index.html#/authHome/topic/' + $stateParams.POST + '/' + $stateParams.USERNAME

        $scope.openShareMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        //////////////////////////////////////////////////////////////////////  CHECK IF YOUR SUPOSE TO SEE  ICONS ////////////////////////////////////////////////////

        $scope.funcCheckEDIT = function(reps) {
            if (currentAuth.uid == reps.replyCreatorUID)
                return true;
            else if ($scope.isModerator == true)
                return true;
            else
                return false;
        }
        $scope.goBackTopic = function() {
            $state.go('authHome.desc')
        }

        $scope.isReplyable = function(rep) {
            if (currentAuth.uid == rep.replyCreatorUID)
                return false;

            else
                return true;
        }
        $scope.isBestAnwser = function(rep) {
            if ($scope.isModerator == true)
                return true;
            else if (currentAuth.uid == rep.replyCreatorUID)
                return true;
            else
                return false;
        }



        $scope.isLikeable = function(rep) {
            if (currentAuth.uid == rep.replyCreatorUID)
                return false;
            else if (currentAuth.uid == null)
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





        function isCheckedHelper(rep) {
            var returnerCheck = "";
            refService.ref().child("Topics").once("value", function(snapshotBestAnwserOutlineTopic) {
                snapshotBestAnwserOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(bookchildData.pushKey).child("BestAnwser").once("value", function(snapBest) {
                            if(snapBest.val()) {
                                if (snapBest.val().isBestAnwser == true && snapBest.val().replyNumber == rep.Replynum)
                                    returnerCheck = "True";
                                else
                                    returnerCheck = "False";
                            }
                            else
                                returnerCheck = "False";
                        })
                    }
                })
            })
            return returnerCheck;
        }

        $scope.isChecked = function(rep) {
            if (isCheckedHelper(rep) == "True")
                return true;
            else
                return false;
        }

        $scope.classBestAnwser = function(rep) {
            if (isCheckedHelper(rep) == "True")
                return "best-answer";
            else
                return "none";
        }

       function bestAnwserRegister(rep) {
            $scope.TOTAL_POINTS_BEST_ANWSERY_LIKES = 0;
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").child($scope.currentAuthGet.uid + "TOPIC:" + $stateParams.POST + "REPLY:" + rep.Replynum + "BESTANSWER").set({
                Point: 15
            })
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").once("value", function(downVoteCheck) {

                for (var i in downVoteCheck.val())
                    $scope.TOTAL_POINTS_BEST_ANWSERY_LIKES = $scope.TOTAL_POINTS_BEST_ANWSERY_LIKES + (downVoteCheck.val()[i].Point)

                refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).update({
                    Points: $scope.TOTAL_POINTS_BEST_ANWSERY_LIKES
                })

            })

        }
        function unbestAnwserRegister(rep) {
            $scope.TOTAL_POINTS_BEST_ANSWERN_LIKES = 0;
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").child($scope.currentAuthGet.uid + "TOPIC:" + $stateParams.POST + "REPLY:" + rep.Replynum + "BESTANSWER").set({
                Point: 0
            })
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").once("value", function(downVoteCheck) {

                for (var i in downVoteCheck.val())
                    $scope.TOTAL_POINTS_BEST_ANSWERN_LIKES = $scope.TOTAL_POINTS_BEST_ANSWERN_LIKES + (downVoteCheck.val()[i].Point)

                refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).update({
                    Points: $scope.TOTAL_POINTS_BEST_ANSWERN_LIKES
                })

            })

        }
        
        
        $scope.notChecked = function(rep) {
            $scope.isChecked = true;

            refService.ref().child("Topics").once("value", function(snapshotBestAnwserOutlineTopic) {
                snapshotBestAnwserOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(bookchildData.pushKey).child("BestAnwser").update({
                            isBestAnwser: true,
                            replyNumber: rep.Replynum
                        })
                        bestAnwserRegister(rep);
                    }
                })
            })

        }

        $scope.checked = function(rep) {
            $scope.isChecked = false;
            refService.ref().child("Topics").once("value", function(snapshotBestAnwserOutlineTopic) {
                snapshotBestAnwserOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(bookchildData.pushKey).child("BestAnwser").update({
                            isBestAnwser: false,
                            replyNumber: null
                        })
                        unbestAnwserRegister(rep);
                    }
                })
            })
        }

        // $scope.checkBoxNot = false;
        // $scope.checkBoxYes = false;
        // $scope.checkBoxTrueCheck = $firebaseArray(refService.ref().child("Topics"));

        // function actualHelperYes(reps) {
        //     $scope.inside;
        //     $scope.checkBoxTrueCheck.$loaded(function(CHECKINGTRUE) {
        //         for (var i = 0; i < CHECKINGTRUE.length; i++) {
        //             if (CHECKINGTRUE[i].Postnum == $stateParams.POST) {
        //                 if (CHECKINGTRUE[i].IsAcceptedAnwser == true && CHECKINGTRUE[i].AcceptedAnwserReplyNum == reps.Replynum) {
        //                     console.log(CHECKINGTRUE[i].AcceptedAnwserReplyNum, reps.Replynum);
        //                     $scope.inside = true;
        //                 }
        //                 else {
        //                     $scope.inside = true;
        //                 }
        //             }
        //         }
        //     })
        //     return $scope.inside;
        // }
        // $scope.checkFuncYes = function(reps) {
        //     if (actualHelperYes(reps) == true) {
        //         return true;
        //     }
        //     else {
        //         console.log(actualHelperYes(reps));
        //         return false;
        //     }
        // }
        // $scope.checkBoxTrueCheck.$loaded(function(CHECKINGTRUE) {
        //     for (var i = 0; i < CHECKINGTRUE.length; i++) {
        //         if (CHECKINGTRUE[i].Postnum == $stateParams.POST) {
        //             if (CHECKINGTRUE[i].IsAcceptedAnwser == true) {
        //                 $scope.checkBoxYes = true;
        //             }
        //             else {
        //                 $scope.checkBoxNot = true;
        //             }
        //         }
        //     }
        // })

        // $scope.checkBoxNotNgClick = function(rep) {
        //     $scope.checkBoxYes = true;
        //     $scope.checkBoxNot = false;
        //     $scope.dataNot = $firebaseArray(refService.ref().child("Topics"));
        //     $scope.dataNot.$loaded(function(dataNoNgClick) {
        //         for (var i = 0; i < dataNoNgClick.length; i++) {
        //             if (dataNoNgClick[i].Postnum == $stateParams.POST) {
        //                 refService.ref().child("Topics").child(dataNoNgClick[i].pushKey).update({
        //                     IsAcceptedAnwser: true,
        //                     AcceptedAnwserReplyNum: rep.Replynum
        //                 })
        //             }
        //         }
        //     })
        // }

        // function bestAnwserImageIfHelper() {
        //     $scope.decicor;
        //     $scope.dataNot = $firebaseArray(refService.ref().child("Topics"));
        //     $scope.dataNot.$loaded(function(dataNoNgClick) {
        //         for (var i = 0; i < dataNoNgClick.length; i++) {
        //             if (dataNoNgClick[i].Postnum == $stateParams.POST) {
        //                 refService.ref().child("Topics").child(dataNoNgClick[i].pushKey).on("value", function(snapshotChild) {
        //                     if (snapshotChild.val().IsAcceptedAnwser == true) {
        //                         $scope.decicor = true
        //                     }
        //                     else {
        //                         $scope.decicor = false
        //                     }
        //                 })

        //             }
        //         }

        //         if ($scope.decicor == true) {
        //             return "True"
        //         }
        //         else {
        //             return "Not"
        //         }
        //     })
        // }
        // $scope.bestAnwserImageIf = function(rep) {
        //     if (bestAnwserImageIfHelper() == "True") {
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // }


        // $scope.checkBoxNgClick = function(rep) {
        //     $scope.checkBoxYes = false;
        //     $scope.checkBoxNot = true;
        //     $scope.dataYes = $firebaseArray(refService.ref().child("Topics"));
        //     $scope.dataYes.$loaded(function(dataYesNgCLick) {
        //         for (var i = 0; i < dataYesNgCLick.length; i++) {
        //             if (dataYesNgCLick[i].Postnum == $stateParams.POST) {
        //                 refService.ref().child("Topics").child(dataYesNgCLick[i].pushKey).update({
        //                     IsAcceptedAnwser: false,
        //                     AcceptedAnwserReplyNum: -1
        //                 })
        //             }
        //         }
        //     })
        // }

        ////Like
        $scope.likeBoxNo = true;
        $scope.likeBoxYes = false;

        function liked(rep) {
            var returner = "";
            refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).once("value", function(snapshotLikeOutlineTopic) {
                snapshotLikeOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Replynum == (rep.Replynum)) {
                        refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).child(bookchildData.pushKey).child("Likes").child($scope.currentAuthGet.uid).once("value", function(snapp) {
                            if (snapp.val() == null)
                                returner = "False";
                            else {
                                if (snapp.val().Like == true)
                                    returner = "True"
                                else
                                    returner = "False";
                            }
                        })
                    }
                })
            })
            return returner;
        }
        $scope.likeBox = function(rep) {
            if (liked(rep) == "True")
                return true;
            else if (liked(rep) == "False")
                return false;
        }

        function likeRegister(rep) {
            $scope.TOTAL_POINTS_REPLIES_LIKES = 0;
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").child($scope.currentAuthGet.uid + "TOPIC:" + $stateParams.POST + "REPLY:" + rep.Replynum).set({
                Point: 5
            })
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").once("value", function(downVoteCheck) {

                for (var i in downVoteCheck.val())
                    $scope.TOTAL_POINTS_REPLIES_LIKES = $scope.TOTAL_POINTS_REPLIES_LIKES + (downVoteCheck.val()[i].Point)

                refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).update({
                    Points: $scope.TOTAL_POINTS_REPLIES_LIKES
                })

            })

        }
        function unLikeRegister(rep) {
            $scope.TOTAL_POINTS_REPLIES_LIKES = 0;
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").child($scope.currentAuthGet.uid + "TOPIC:" + $stateParams.POST + "REPLY:" + rep.Replynum).set({
                Point: 0
            })
            refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).child("PointsOBJ").once("value", function(downVoteCheck) {

                for (var i in downVoteCheck.val())
                    $scope.TOTAL_POINTS_REPLIES_LIKES = $scope.TOTAL_POINTS_REPLIES_LIKES + (downVoteCheck.val()[i].Point)

                refService.ref().child("UserAuthInfo").child(rep.replyCreatorUID).update({
                    Points: $scope.TOTAL_POINTS_REPLIES_LIKES
                })

            })

        }
        
        $scope.likeBoxNoNgClick = function(rep) {
            //Your About To Like the Post
            $scope.likeBoxYes = true;
            $scope.likeBoxNo = false;
            refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).once("value", function(snapshotLikeOutlineTopic) {
                snapshotLikeOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Replynum == (rep.Replynum)) {
                        refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).child(bookchildData.pushKey).child("Likes").child($scope.currentAuthGet.uid).update({
                            Like: true,
                            Avatar: $scope.currentUserAvatar
                        })
                        likeRegister(rep);
                    }
                })
            })
        }


        $scope.likeBoxYesNgClick = function(rep) {
            $scope.likeBoxYes = false;
            $scope.likeBoxNo = true;
            refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).once("value", function(snapshotLikeOutlineTopic) {
                snapshotLikeOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Replynum == (rep.Replynum)) {
                        refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).child(bookchildData.pushKey).child("Likes").child($scope.currentAuthGet.uid).update({
                            Like: false,
                            Avarar: $scope.currentUserAvatar
                        })
                        unLikeRegister(rep);
                    }
                })
            })
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


        //Like Views


        /*
        $scope.objBookmark = $firebaseObject(refService.ref().child("Topics"))
                             $scope.objBookmark.$loaded(function(dataBook){
                                 for(var prop in dataBook){
                                     console.log(prop);
                                     if(dataBook[prop] !== null) {
                                         if(dataBook[prop].Postnum == $stateParams.POST) {
                                             refService.ref().child("Topics").child(dataBook[prop].pushKey).child("Bookmarks").child($scope.currentAuthGet.uid).on("value", function(snapap){
                                                   if(snapap.val() !== null) {
                                                       $scope.bookMarkToggleTopic = !(snapap.val().Bookmark);
                                                   }
                                             })
                                         }
                                     }
                                 }
                             })
                            
                              $scope.tagCheckPrev = $firebaseObject(refService.ref().child("Constants").child("Tags"));

         
                            refService.ref().child("Topics").once("value", function(snapshotBookMarkOutlineTopic) {
                                    snapshotBookMarkOutlineTopic.forEach(function(evenChildBook) {
                                        var bookkey = evenChildBook.key();
                                        var bookchildData = evenChildBook.val();
                                        if (bookchildData.Postnum == $stateParams.POST) {
                                            var firebaseCheckBookmark = $firebaseObject(refService.ref().child("Topics").child(bookchildData.pushKey).child("Bookmarks"))
                                            firebaseCheckBookmark.$loaded(function(dataC) {
                                                if(dataC[$scope.currentAuthGet.uid]){
                                                    refService.ref().child("Topics").child(bookchildData.pushKey).child("Bookmarks").child($scope.currentAuthGet.uid).on("value", function(snapap){
                                                       if(snapap.val() !== null) {
                                                           $scope.bookMarkToggleTopic = snapap.val().Bookmark;
                                                       }
                                                    })
                                                }
                                                else
                                                    $scope.bookMarkToggleTopic = true;
                                            })
                                            
                                        }
                                    })
                             })
                    
        */
        //TOPIC BUTTONS//////////////////BEGIN//////////////////////////////////////

        function VoteHelper() {
            var returne = ''
            refService.ref().child("Topics").once("value", function(snapshotBookMarkOutlineTopic) {
                snapshotBookMarkOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(bookchildData.pushKey).child("Vote").child($scope.currentAuthGet.uid).once("value", function(snapSHOT) {
                            if(snapSHOT.val()) {
                                if (snapSHOT.val().Vote == 1)
                                    returne = 'Up';
                                else if (snapSHOT.val().Vote == -1)
                                    returne = 'Down'
                            }
                        })
                    }
                })
            })
            return returne;
        }
        $scope.upVoteCheck = function() {
            if (VoteHelper() == 'Up')
                return 'upvote';
        }

        $scope.downVoteCheck = function() {
            if (VoteHelper() == 'Down')
                return 'downvote';
        }

        //BookMark
        //Ng-if
        //Toggle
        //$scope.bookMarkToggleTopic = true;
        $scope.objBookmark = $firebaseObject(refService.ref().child("Topics"))
        $scope.objBookmark.$loaded(function(dataBook) {
                for (var prop in dataBook) {
                    if (dataBook[prop] !== null) {
                        if (dataBook[prop].Postnum == $stateParams.POST) {
                            refService.ref().child("Topics").child(dataBook[prop].pushKey).child("Bookmarks").child($scope.currentAuthGet.uid).on("value", function(snapap) {
                                if (snapap.val() !== null) {
                                    $scope.bookMarkToggleTopic = !(snapap.val().Bookmark);
                                }
                                else
                                    $scope.bookMarkToggleTopic = true;
                            })
                        }
                    }
                }
            })
            //Ng-Click        
        $scope.bookmarkClickOutlineTopic = function() {
            refService.ref().child("Topics").once("value", function(snapshotBookMarkOutlineTopic) {
                snapshotBookMarkOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(bookchildData.pushKey).child("Bookmarks").child($scope.currentAuthGet.uid).update({
                            Bookmark: true
                        })
                    }
                })
            })
            $scope.bookMarkToggleTopic = false;
        }
        $scope.bookmarkClickNonOutlineTopic = function() {
            refService.ref().child("Topics").once("value", function(snapshotBookMarkOutlineTopic) {
                snapshotBookMarkOutlineTopic.forEach(function(evenChildBook) {
                    var bookkey = evenChildBook.key();
                    var bookchildData = evenChildBook.val();
                    if (bookchildData.Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(bookchildData.pushKey).child("Bookmarks").child($scope.currentAuthGet.uid).update({
                            Bookmark: false
                        })
                    }
                })
            })
            $scope.bookMarkToggleTopic = true;
        }

        //Edit
        //ng-if
        $scope.editTopicPriv = function() {
            if ($scope.isModerator == true)
                return true;
            else if ($scope.creatorUID == ($scope.currentAuthGet.uid || currentAuth.uid))
                return true;
            else
                return false;
        }
        $scope.flagSee = function() {
            if ($scope.isModerator == true)
                return true;
            else if (currentAuth.uid == $scope.creatorUID)
                return false;
            else if (currentAuth.uid == null)
                return false;
            else
                return true;
        }

        //ng-click
        $scope.editTopic = function(ev) {
            if (ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'editTopicPanelCtrl',
                        templateUrl: 'app/components/editTopicPanel/editTopicPanel.html',
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

        $scope.canDeleteCheck = function(rep) {
            if ($scope.isModerator == true)
                return true;
            else
                return false;
        }

        //Delete
        //Ng-if
        $scope.deleteTopicPriv = function() {
            if ($scope.isModerator == true)
                return true;
            else
                return false;
        }

        //Ng-Click
        $scope.deleteTopic = function() {
            vex.dialog.confirm({
                message: 'Are you sure you want to delete this topic?',
                callback: function(value) {
                    if (value == true) {
                        refService.ref().child("Topics").once("value", function(snapshotTopic) {
                            snapshotTopic.forEach(function(evenChildBook) {
                                var bookkey = evenChildBook.key();
                                var bookchildData = evenChildBook.val();
                                if (bookchildData.Postnum == $stateParams.POST) {
                                    refService.ref().child("Topics").child(bookchildData.pushKey)
                                        .remove(function(error) {
                                            if (error)
                                                alertify.error("Deleting Topic Failed");
                                            else {
                                                refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST)
                                                    .remove(function(error) {
                                                        if (error)
                                                            alertify.error("Deleting Topic Failed");
                                                        else {
                                                            alertify.success("Deleted, Successfully")
                                                        }
                                                    })
                                            }
                                        })
                                }
                            })
                        })
                    }
                }
            });
        }
        $scope.repliesLikesNum = [];
        var count_likes = 0;
        refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).on("value", function(snapRepNum) {
            snapRepNum.forEach(function(snapRepNumChild) {
                var key = snapRepNumChild.key();
                var childData = snapRepNumChild.val();
                if (childData.Likes) {

                    for (var i in childData.Likes)
                        count_likes++;

                    $scope.repliesLikesNum.push(count_likes)
                    count_likes = 0;


                }
                //    $scope.repliesLikesNum.push(childData.Likes)
                else
                    $scope.repliesLikesNum.push(0)
            })
        })

        $scope.seeTopicLikes = function(num_likes, rep, ev) {
            if (ev) {
                topicLikesService.setInfo(num_likes, rep);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'viewTopicLikes',
                        templateUrl: 'app/components/viewTopicLikes/viewTopicLikes.html',
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
        
        
        
        
        /////////////////////////////////REPLIES///////////////////////////////
        
        
        
        
        
                var elem_hash = '';
        $scope.dataTrib = [];
        $scope.dataTribHash = [];
        refService.ref().child("UserAuthInfo").once("value", function(snapUser) {
            snapUser.forEach(function(snapUserEach) {
                var key = snapUserEach.key();
                var val = snapUserEach.val();
                $scope.dataTrib.push({
                    key: '<img src="' + val.Image + '" width="30px" height="30px"/> ' + val.Username,
                    value: val.Username
                })
                var tribute = new Tribute({
                    trigger: '@',
                    values: $scope.dataTrib,
                })
                angular.element(document).ready(function() {
                    tribute.attach(document.getElementById('markdownUserType'));
                })

            })
        })

        refService.ref().child("Topics").once("value", function(snapTopic) {
            snapTopic.forEach(function(snapTopicEven) {
                var key = snapTopicEven.key();
                var val = snapTopicEven.val();
                $scope.dataTribHash.push({
                    key: "#" + val.Postnum + ":" + val.Title,
                    value: "#" + (val.Postnum)
                })
            })
            var tribute_hash = new Tribute({
                trigger: '#',
                values: ($scope.dataTribHash),
                selectTemplate: function(item) {
                    return (item.original.value).replace("@", "");
                },
            })
            angular.element(document).ready(function() {
                setTimeout(function() {
                    tribute_hash.attach(document.getElementById('markdownUserType'));
                }, 500)
            })
        })



        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function(code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code).value;
                }
                else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });

        $scope.emojieList = emojiListService.getEmojies();
        $scope.$watch('markdownData', function(current, original) {
            if (current)
                $scope.outputText = marked(current);
            //EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
            if ($scope.outputText) {
                for (var prop in $scope.emojieList)
                    $scope.outputText = $scope.outputText.replaceAll(prop, $scope.emojieList[prop]);
            }
        });

        $scope.shortcuts = function(shortcutName) {
            var element = document.getElementById('markdownUserType');
            switch (shortcutName) {
                case 'bold':
                    element.value += '**BoldTextHere**';
                    break;
                case 'italics':
                    element.value += '_ItalicTextHere_';
                    break;

                case 'image':
                    element.value += '![](http://)';
                    break;

                case 'url':
                    element.value += '[](http://)';
                    break;

                case 'quote':
                    element.value += '> Quote Here';
                    break;

                case 'number':
                    element.value += '\n\n 1. List item'
                    break;

                case 'bullet':
                    element.value += '\n\n * List item'
                    break;
                case 'header':
                    element.value += '# Header Here.';
                    break;

                case 'code':
                    element.value += "```[languageName. If you dont know delete this bracket and leave it with three ticks]\n" + "console.log('Code Here') \n" + "```";
                    break;

                case 'horizontal':
                    element.value += "\n\n -----"
                    break;

                case 'paste':
                    if (window.clipboardData) {
                        element.value += window.clipboardData.getData("Text");
                    }
                    else {
                        alertify.error(window.clipboardData.getData('Text'));
                    }

                case 'emojies':

                case 'help':
                    window.open('https://simplemde.com/markdown-guide');
                    break;

            }
        }


        $scope.emojieStart = function(ev) {
            if (ev) {
                var element = document.getElementById('markdownUserType');
                //emojieTool.setElementInfo(element);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'emojieToolCtrl',
                        templateUrl: 'app/components/emojieTool/emojieTool.html',
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

       
                    

        $scope.submitNewReply = function() {
            $scope.numRepliesAlready = $firebaseArray(refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST))

            $scope.numRepliesAlready.$loaded(function(data) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGet.uid).on("value", function(snapshot) {
                    $scope.userAvatar = snapshot.val().Image;
                    $scope.userName = snapshot.val().Username;
                    $scope.userEmail = snapshot.val().Email;

                })
                var pushingR = refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).push({
                    replyCreatorUsername: $scope.userName,
                    replyCreatorAvatar: $scope.userAvatar,
                    replyCreatorEmail: $scope.userEmail,
                    replyCreatorUID: $scope.currentAuthGet.uid,
                    replyCreatorValue: $scope.markdownData,
                    replyCreatorDate: Date.now(),
                    Replynum: data.length,
                    replyCreatorDateParsed: timeService.getTimeF(new Date(parseInt(Date.now()))),
                    topicCreatorUsername: replyService.creatorUsername,
                    topicCreatorUID: replyService.creatorUID,
                    topicCreatorTitle: replyService.creatorTitle,
                    topicCreatorAvatar: replyService.creatorAvatar,
                    topicCreatorSince: replyService.timeSinceCreated

                })
                refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST).child(pushingR.key()).update({
                    pushKey: pushingR.key()
                })
                
               


                //Last Active -Topic
                $scope.lastAct = $firebaseObject(refService.ref().child("Topics"));
                $scope.lastAct.$loaded(function(dataLast) {
                    dataLast.forEach(function(snapDataLastAct) {
                        if (snapDataLastAct.Postnum == $stateParams.POST) {
                            refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                LastActivity: Date.now(),
                            })
                            refService.ref().child("Topics").child(snapDataLastAct.pushKey).once("value", function(snapREPVIEWS) {
                                if (!snapREPVIEWS.val().RepliesNum) {
                                    console.log(snapREPVIEWS)
                                    refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                        RepliesNum: (1)
                                    })
                                }
                                else {
                                    refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                        RepliesNum: (snapREPVIEWS.val().RepliesNum + 1)
                                    })
                                }


                            })
                        }
                    })
                })
                $scope.markdownData = '';
                $mdDialog.cancel();


            })
            


        }
        
        
        
        
        
        
        
        
        ////////////////////////////REPLIES////////////////////////////////
        
        
        
    }
})(angular);