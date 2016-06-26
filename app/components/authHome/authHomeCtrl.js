(function(angular) {

    'use strict';
    angular
        .module('ForumApp')
        .controller('authHome', ["$scope", "$firebaseObject", "$state", "$mdDialog", "badgesService", "$mdMedia", "$firebaseArray", "refService",
            "$mdBottomSheet", authHomeCtrl
        ])

    function authHomeCtrl($scope, $firebaseObject, $state, $mdDialog, badgesService, $mdMedia, $firebaseArray, refService, $mdBottomSheet) {
        $state.go('authHome.desc')

        $scope.currentAuthGetHome = refService.ref().getAuth();

        if ($scope.currentAuthGetHome != null) {
            var amOnline = refService.ref();
            var userRef = refService.ref().child("presence").child($scope.currentAuthGetHome.uid);
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

        if ($scope.authData.uid) {
            refService.ref().child("UserAuthInfo").child($scope.authData.uid).once("value", function(snapTour) {

                if (snapTour.val().newUser == true) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Welcome New User')
                        .textContent('Hello, We will like to introduce you to Ng-Forum! First, you can naviagte through your profile, settings, go to this forum, or even logout by clicking on your avatar. If you would like to see badges, FAQ, etc.. you can click on the menu bar. You can navigate through the forum topics, below on this page. And to see replies and so on for a topic, just click on the topic you wish. If you want to create a new topic, just click the create a new topic button. If you have any questions be sure to PM(Private Message) Mods, or email me at abogale2@gmail.com. Hope you enjoy using this forum :) !')
                        .ariaLabel('Touring New User')
                        .ok('Got it!')
                        .targetEvent(document.body)
                    );
                    refService.ref().child("UserAuthInfo").child($scope.authData.uid).update({
                        newUser : false
                    })
                }
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
                    if (repSnapChild2.val().replyCreatorUID == $scope.currentAuthGetHome.uid) {
                        $scope.activeUserBadgeCount++;
                    }
                })


                //Bronze
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankOne").set({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.rankone.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankOne").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankTwo").set({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.ranktwo.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankTwo").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankThree").set({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.rankthree.pushObj
                    })
                }
                else {

                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankThree").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })

                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.bronze.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankFour").set({
                        BronzeBadge: $scope.arrBadges.activeUser.bronze.rankfour.pushObj
                    })
                }

                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Reply").child("RankFour").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }

                //SILVER        
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankOne").set({
                        SilverBadge: $scope.arrBadges.activeUser.silver.rankone.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankOne").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankTwo").set({
                        SilverBadge: $scope.arrBadges.activeUser.silver.ranktwo.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankTwo").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankThree").set({
                        SilverBadge: $scope.arrBadges.activeUser.silver.rankthree.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankThree").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.silver.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankFour").set({
                        SilverBadge: $scope.arrBadges.activeUser.silver.rankfour.pushObj
                    })
                }

                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Reply").child("RankFour").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })

                }

                //GOLD
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankOne").set({
                        GoldBadge: $scope.arrBadges.activeUser.gold.rankone.pushObj
                    })
                }

                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankOne").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankTwo").set({
                        GoldBadge: $scope.arrBadges.activeUser.gold.ranktwo.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankTwo").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankThree").set({
                        GoldBadge: $scope.arrBadges.activeUser.gold.rankthree.pushObj
                    })
                }


                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankThree").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }

                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.gold.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankFour").set({
                        GoldBadge: $scope.arrBadges.activeUser.gold.rankfour.pushObj
                    })
                }

                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Reply").child("RankFour").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }

                //PLATINUM
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.rankone.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankOne").set({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.rankone.pushObj
                    })
                }

                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankOne").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }

                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.ranktwo.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankTwo").set({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.ranktwo.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankTwo").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }
                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.rankthree.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankThree").set({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.rankthree.pushObj
                    })
                }
                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankThree").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }

                if ($scope.activeUserBadgeCount >= $scope.arrBadges.activeUser.platinum.rankfour.Replies) {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankFour").set({
                        PlatinumBadge: $scope.arrBadges.activeUser.platinum.rankfour.pushObj
                    })
                }

                else {
                    refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("PlatinumBadge").child("Reply").child("RankFour").remove(
                        function(error) {
                            if (error)
                                alertify.error("Internal Error");
                            else {

                            }
                        })
                }


            })

        })



        $scope.topicBadges = badgesService.getTopicBadges();
        $scope.topicCount = 0;
        refService.ref().child("Topics").once("value", function(snapBadTopics) {
            snapBadTopics.forEach(function(snapBadTopicsChild) {
                    if (snapBadTopicsChild.val().UID == $scope.currentAuthGetHome.uid)
                        $scope.topicCount++;
                })
                //BRONZE
            if ($scope.topicCount >= $scope.topicBadges.questionLover.bronze.rankone.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankOne").set({
                    BronzeBadge: $scope.topicBadges.questionLover.bronze.rankone.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.bronze.ranktwo.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankTwo").set({
                    BronzeBadge: $scope.topicBadges.questionLover.bronze.ranktwo.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.bronze.rankthree.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankThree").set({
                    BronzeBadge: $scope.topicBadges.questionLover.bronze.rankthree.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.bronze.rankfour.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankFour").set({
                    BronzeBadge: $scope.topicBadges.questionLover.bronze.rankfour.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("BronzeBadge").child("Topics").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }

            //SILVER

            if ($scope.topicCount >= $scope.topicBadges.questionLover.silver.rankone.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankOne").set({
                    SilverBadge: $scope.topicBadges.questionLover.silver.rankone.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.silver.ranktwo.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankTwo").set({
                    SilverBadge: $scope.topicBadges.questionLover.silver.ranktwo.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.silver.rankthree.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankThree").set({
                    SilverBadge: $scope.topicBadges.questionLover.silver.rankthree.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.silver.rankfour.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankFour").set({
                    SilverBadge: $scope.topicBadges.questionLover.silver.rankfour.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("SilverBadge").child("Topics").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }

            //GOLD

            if ($scope.topicCount >= $scope.topicBadges.questionLover.gold.rankone.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankOne").set({
                    GoldBadge: $scope.topicBadges.questionLover.gold.rankone.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.gold.ranktwo.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankTwo").set({
                    GoldBadge: $scope.topicBadges.questionLover.gold.ranktwo.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.gold.rankthree.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankThree").set({
                    GoldBadge: $scope.topicBadges.questionLover.gold.rankthree.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.gold.rankfour.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankFour").set({
                    GoldBadge: $scope.topicBadges.questionLover.gold.rankfour.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("GoldBadge").child("Topics").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }


            //PLATNIUM

            if ($scope.topicCount >= $scope.topicBadges.questionLover.platinum.rankone.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankOne").set({
                    Platinum: $scope.topicBadges.questionLover.platinum.rankone.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.platinum.ranktwo.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankTwo").set({
                    Platinum: $scope.topicBadges.questionLover.platinum.ranktwo.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.platinum.rankthree.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankThree").set({
                    Platinum: $scope.topicBadges.questionLover.platinum.rankthree.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.topicCount >= $scope.topicBadges.questionLover.platinum.rankfour.Topics) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankFour").set({
                    Platinum: $scope.topicBadges.questionLover.platinum.rankfour.Topics
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("Topics").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }


        })


        $scope.daysVistedBadge = badgesService.getDaysVisitedBadges();
        refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).once("value", function(daysVisited) {

            $scope.daysSinceJoined = moment.duration((moment(new Date())).diff(moment(new Date(parseInt(daysVisited.val().DateJoined)))))._days

            //Bronze
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.bronze.rankone.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankOne").set({
                    Bronze: $scope.daysVistedBadge.daysVisited.bronze.rankone.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.bronze.ranktwo.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankTwo").set({
                    Bronze: $scope.daysVistedBadge.daysVisited.bronze.ranktwo.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.bronze.rankthree.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankThree").set({
                    Bronze: $scope.daysVistedBadge.daysVisited.bronze.rankthree.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.bronze.rankfour.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankFour").set({
                    Bronze: $scope.daysVistedBadge.daysVisited.bronze.rankfour.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Bronze").child("DaysVisted").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }


            //Silver
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.silver.rankone.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankOne").set({
                    Silver: $scope.daysVistedBadge.daysVisited.silver.rankone.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.silver.ranktwo.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankTwo").set({
                    Silver: $scope.daysVistedBadge.daysVisited.silver.ranktwo.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.silver.rankthree.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankThree").set({
                    Silver: $scope.daysVistedBadge.daysVisited.silver.rankthree.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.silver.rankfour.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankFour").set({
                    Silver: $scope.daysVistedBadge.daysVisited.silver.rankfour.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Silver").child("DaysVisted").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }

            //Gold
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.gold.rankone.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankOne").set({
                    Gold: $scope.daysVistedBadge.daysVisited.gold.rankone.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.gold.ranktwo.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankTwo").set({
                    Gold: $scope.daysVistedBadge.daysVisited.gold.ranktwo.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.gold.rankthree.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankThree").set({
                    Gold: $scope.daysVistedBadge.daysVisited.gold.rankthree.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.gold.rankfour.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankFour").set({
                    Gold: $scope.daysVistedBadge.daysVisited.gold.rankfour.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Gold").child("DaysVisted").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }

            //platinum
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.platinum.rankone.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankOne").set({
                    Platinum: $scope.daysVistedBadge.daysVisited.platinum.rankone.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankOne").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.platinum.ranktwo.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankTwo").set({
                    Platinum: $scope.daysVistedBadge.daysVisited.platinum.ranktwo.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankTwo").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.platinum.rankthree.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankThree").set({
                    Platinum: $scope.daysVistedBadge.daysVisited.platinum.rankthree.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankThree").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }
            if ($scope.daysSinceJoined >= ($scope.daysVistedBadge.daysVisited.platinum.rankfour.Days)) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankFour").set({
                    Platinum: $scope.daysVistedBadge.daysVisited.platinum.rankfour.pushObj
                })
            }
            else {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGetHome.uid).child("Platinum").child("DaysVisted").child("RankFour").remove(function(err) {
                    if (err)
                        alertify.error("Internal Error")
                })
            }


        })

        /////BADGES HANDLING END////////////////////////////////////////
    }

})(angular);