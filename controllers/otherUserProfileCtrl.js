(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('otherUserProfileCtrl', ["$scope", "$firebaseArray", "$stateParams", "refService", "$mdDialog","otherUserProfilePageService", "$firebaseObject", "$state", "otherUserService", "timeService", otherUserProfileCtrl])

    function otherUserProfileCtrl($scope, $firebaseArray, $stateParams, refService, $mdDialog,otherUserProfilePageService, $firebaseObject, $state, otherUserService, timeService) {

        var info = otherUserService.getUserInfo();
        var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child(info.replyCreatorUID));
        var topicLenObj = $firebaseArray(refService.ref().child("Topics"));
        $scope.precence = "";
        $scope.timeSinceNoPageOBJ = "Not Set"
        $scope.timeSinceNoPage = "Not";
        $scope.currentAuthGetOTHER = refService.ref().getAuth();
        $scope.info = otherUserService.getUserInfo()
        $scope.otherUserUID = $scope.info.replyCreatorUID
        $scope.otherUserUsername = '';



        obj.$loaded(function(data) {
                $scope.info = otherUserService.getUserInfo()
                $scope.ACTUALinfo = otherUserService.ACTUALgetUserInfo();
                $scope.otherUserEmail = $scope.info.replyCreatorEmail
                $scope.otherUserImage = $scope.info.replyCreatorAvatar
                $scope.otherUserUID = $scope.info.replyCreatorUID
                $scope.otherUserUsername = $scope.info.replyCreatorUsername;
                $scope.numFollowing = data.following;
                $scope.numFollowers = data.followers;
                if ($scope.ACTUALinfo.Moderator == false) {
                    $scope.otherMod = "Not a Moderator";
                }
                else {
                    $scope.otherMod = "Respected Moderator";
                }
                $scope.otherDesc = $scope.ACTUALinfo.Description || "This user is silent as the butterflies";
                $scope.count = 0;

                 topicLenObj.$loaded(function(topicData) {
                     for (var i = 0; i < topicData.length; i++) {
                         if (topicData[i].UID == $scope.otherUserUID) {
                             $scope.count++;
                         }
                     }
                 })

                $scope.timeSINCEOBJ = $firebaseObject(refService.ref());
                $scope.timeSINCEOBJ.$loaded(function(dataLOAD){
                    var OBJPRECENCE = dataLOAD.presence;
                    for(var prop in OBJPRECENCE){
                        var id = $scope.otherUserUID
                        $scope.timeSinceNoPageOBJ = OBJPRECENCE[id];
                    }
                })
                
                var userRef = new Firebase('https://uniquecodersforums.firebaseio.com/presence/' + $scope.otherUserUID);
                userRef.once("value", function(snapshotPrecence) {
                    if (snapshotPrecence.val() == "Online")
                        $scope.precence = true

                    else if (snapshotPrecence.val() == "Idle")
                        $scope.precence = "Idle"

                    else{
                        $scope.precence = false
                        $scope.timeSinceNoPage = timeService.getTimeF(new Date(parseInt(snapshotPrecence.val())));
                        console.log($scope.timeSinceNoPage)
                    }

                })
            },
            function(error) {
                console.error("Error:", error);
            }
        );
       



        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.goToPage = function(){
            console.log($scope.otherUserUsername);
            otherUserProfilePageService.setID($scope.otherUserUID);
            $state.go('authHome.otherUserPage', {
                'USERNAME' : $scope.otherUserUsername
            })
        }


$scope.addFolower = function() {
            $scope.followerCheck = $firebaseArray(refService.ref().child("UserAuthInfo").child($scope.otherUserUID))
            $scope.followingCheck = $firebaseArray(refService.ref().child("UserAuthInfo").child($scope.currentAuthGetOTHER.uid))


            $scope.followerCheck.$loaded(function(dataCheckFollower) {
                console.log(dataCheckFollower)
                for (var i = 0; i < dataCheckFollower.length; i++) {
                    if (dataCheckFollower[i].$id == "followers") {
                        refService.ref().child("UserAuthInfo").child($scope.otherUserUID).child('followerLength').update({
                            followers: (dataCheckFollower[i].$value + 1)
                        })

                        refService.ref().child("UserAuthInfo").child($scope.currentAuthGetOTHER.uid).on("value", function(snap) {
                            refService.ref().child("UserAuthInfo").child($scope.otherUserUID).child('followerLength').child('followersInfo').push({
                                UID: $scope.currentAuthGetOTHER.uid,
                                Username: snap.val().Username,
                                Avatar: snap.val().Image,
                                Desc: snap.val().Description || "The User is Silent as the butterflies..."
                            })
                        })

                    }
                }

            })

            $scope.followingCheck.$loaded(function(dataCheckFollowing) {
                console.log(dataCheckFollowing)
                for (var i = 0; i < dataCheckFollowing.length; i++) {
                    if (dataCheckFollowing[i].$id == "following") {
                        refService.ref().child("UserAuthInfo").child($scope.currentAuthGetOTHER.uid).child('followingLength').update({
                            following: (dataCheckFollowing[i].$value + 1)
                        })
                        refService.ref().child("UserAuthInfo").child($scope.otherUserUID).on("value", function(snapp) {
                            refService.ref().child("UserAuthInfo").child($scope.currentAuthGetOTHER.uid).child('followingLength').child('followingInfo').update({
                                UID: $scope.currentAuthGetOTHER.uid,
                                Username: snapp.val().Username,
                                Avatar: snapp.val().Image,
                                Desc: snapp.val().Description || "The User is Silent as the butterflies..."
                            })
                        })

                    }
                }

            })

        }


        $scope.privateMessageStart = function(username, mod, desc, image) {
            $state.go("authHome.privateMes")
        }
        $scope.goToTopic = function(top) {
            $state.go("authHome.topic", {
                "AVATAR": $scope.otherUserImage,
                "DATE": top.DateCreated,
                "EMAIL": $scope.otherUserEmail,
                "TITLE": top.Title,
                "UID": top.UID,
                "USERNAME": top.Username,
                "VALUE": top.Value
            })
        }

    }
})(angular);