(function(angular) {

    'use strict';
    angular
        .module('ForumApp')
        .controller('authHome', ["$scope", "$firebaseObject", "$state", "$mdDialog", "badgesService", "$mdMedia", "$firebaseArray", "refService", "$mdBottomSheet", authHomeCtrl])

    function authHomeCtrl($scope, $firebaseObject, $state, $mdDialog, badgesService, $mdMedia, $firebaseArray, refService, $mdBottomSheet) {
        $state.go('authHome.desc')

        $scope.currentAuthGetHome = refService.ref().getAuth();

        if ($scope.currentAuthGetHome != null) {
            var amOnline = new Firebase('https://uniquecoders.firebaseio.com/.info/connected');
            var userRef = new Firebase('https://uniquecoders.firebaseio.com/presence/' + $scope.currentAuthGetHome.uid);
            amOnline.on('value', function(snapshot) {
                if (snapshot.val()) {
                    userRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
                    userRef.set("Online");
                }
            });

            document.onIdle = function() {
                userRef.set('idle');
            }
            document.onAway = function() {
                userRef.set('away');
            }
            document.onBack = function(isIdle, isAway) {
                userRef.set('online');
            }
        }




        //ADD TAGS
        if (!alertify.myAlert) {
            alertify.dialog('myAlert', function() {
                return {
                    main: function(message) {
                        this.message = message;
                    },
                    setup: function() {
                        return {
                            buttons: [{
                                text: "Ok!",
                                key: 27 /*Esc*/
                            }],
                            focus: {
                                element: 0
                            }
                        };
                    },
                    prepare: function() {
                        this.setContent(this.message);
                    }
                }
            });
        }



        $scope.authData = refService.ref().getAuth();

        if ($scope.authData) {
            var currentAuth = refService.ref().getAuth();
            refService.ref().onAuth(function(authData) {})

            var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child(currentAuth.uid));
            obj.$loaded(function(data) {
                    $scope.Username = data.Username;
                    $scope.Email = data.Email;
                    $scope.UID = currentAuth.uid;
                    $scope.image = data.Image;

                    if (data.newUser == true) {
                        //NewUser Vec

                    }
                },
                function(error) {
                    console.error("Error:", error);
                }
            );

        }
        else {
            $scope.Username = "Tester";
            $scope.Email = "Tester@Tester.com";
            $scope.UID = "3424j23k4j32n4un43ui";
            $scope.image = 'http://cs624223.vk.me/v624223037/2b1bb/GRTKddkmXiw.jpg'
                //alertify.myAlert("Please Signup to get more feautres. Sign Up Button located at top right.");
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Sign up!')
                .textContent('YPlease Signup to get more feautres. Sign Up Button located at top right')
                .ok('Got it!')
                .targetEvent(document.body)
            );
        }

        $scope.goToProfile = function() {
            $state.go("authHome.profile", {
                "UID": $scope.currentAuthGetHome.uid
            })
        }
        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        $scope.logout = function() {
            refService.ref().unauth();
            location.reload(true);
            location.reload(true);
        }

        $scope.goToSettings = function() {
            $state.go("authHome.settings", {
                "UID": $scope.UID,
                "USERNAME": $scope.Username
            })
        }



        ///////BADGES HANDLING START//////////////////////////////////////
        $scope.arrBadges = badgesService.getReplyBadges();
        $scope.activeUserBadgeCount = 0;
        refService.ref().child("Replies").once("value", function(repSnap) {
            repSnap.forEach(function(repSnapChild) {
                //amanuelhi0
                repSnapChild.forEach(function(repSnapChild2) {
                    //-KKQtkhkau9bMerPKVrk
                    if (repSnapChild2.val().replyCreatorUID ==  $scope.currentAuthGetHome.uid) {
                        $scope.activeUserBadgeCount++;
                    }
                })


                //BRONZE
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("BronzeBadge").push({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.rankone.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("BronzeBadge").push({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.ranktwo.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("BronzeBadge").push({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.rankthree.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("BronzeBadge").push({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.rankfour.pushObj
                    })
                }

                //SILVER        
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("SilverBadge").push({
                        SilverBadge: $scope.arrBadges.activeUser.silver.rankone.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("SilverBadge").push({
                        SilverBadge: $scope.arrBadges.activeUser.silver.ranktwo.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("SilverBadge").push({
                        SilverBadge: $scope.arrBadges.activeUser.silver.rankthree.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("SilverBadge").push({
                        SilverBadge: $scope.arrBadges.activeUser.silver.rankfour.pushObj
                    })
                }

                //GOLD
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("GoldBadge").push({
                        GoldBadge: $scope.arrBadges.activeUser.gold.rankone.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("GoldBadge").push({
                        GoldBadge: $scope.arrBadges.activeUser.gold.ranktwo.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("GoldBadge").push({
                        GoldBadge: $scope.arrBadges.activeUser.gold.rankthree.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("GoldBadge").push({
                        GoldBadge: $scope.arrBadges.activeUser.gold.rankfour.pushObj
                    })
                }

                //PLATINUM
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("PlatinumBadge").push({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.rankone.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("PlatinumBadge").push({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.ranktwo.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("PlatinumBadge").push({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.rankthree.pushObj
                    })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child( $scope.currentAuthGetHome.uid).child("PlatinumBadge").push({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.rankfour.pushObj
                    })
                }


            })

        })

        /////BADGES HANDLING END////////////////////////////////////////



    }

})(angular);