(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('authHome', ["$scope", "$firebaseObject", "$state", "$mdDialog", "$mdMedia", "$firebaseArray", "refService", "$mdBottomSheet", authHomeCtrl])

    function authHomeCtrl($scope, $firebaseObject, $state, $mdDialog, $mdMedia, $firebaseArray, refService, $mdBottomSheet) {
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



        //          var tour = new Tour({
        //               steps: [
        //               {
        //                 element: ".toolbar_new_topic",
        //                 title: "Avatar",
        //                 content: "Click on it to change settings, see profile, or logout."
        //               },
        //               {
        //                 element: ".toolbar_new_topic",
        //                 title: "Creating a new topic",
        //                 content: "To Create a new topic, click on the new topic button"
        //               },
        //               {
        //                 element: ".listdemoListControls",
        //                 title: "Topics",
        //                 content: "These are the topics in this forum"
        //               },
        //               {
        //                 element: ".noright",
        //                 title: "Topic",
        //                 content: "Click on topic, to see its value!"
        //               }
        //             ]});

        //             // Initialize the tour
        //             tour.init();
        // // Start the tour
        // tour.start();


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
            alertify.myAlert("Please Signup to get more feautres. Sign Up Button located at top right");
        }

        $scope.goToProfile = function() {
            $state.go("authHome.profile", {
                "UID": $scope.UID,
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



    }

})(angular);