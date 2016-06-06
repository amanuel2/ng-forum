(function(angular) {

    var app = angular.module('ForumApp');

    app.controller('authCtrl', ["$scope", "$state", "refService", "$firebaseObject", "authCheckTrueService", "$firebaseArray", "$http", "$mdDialog", "letterAvatarService", authCtrl]);

    function authCtrl($scope, $state, refService, $firebaseObject, authCheckTrueService, $firebaseArray, $http, $mdDialog, letterAvatarService) {
        $scope.loadImageJSON = 'NOTLOADED';
        authCheckTrueService.checkAuth(refService.ref(), "authHome.desc");

        function PASSWORDRESET(length) {
            var possibleChars = ['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?_-'];
            var password = '';
            for (var i = 0; i < length; i += 1) {
                password += possibleChars[Math.floor(Math.random() * possibleChars.length)];
            }
            return password;
        }


        $scope.forgotPass = function() {
            alertify.prompt(
                'Recover Password',
                'Enter Email Of Account',
                function(evt, value) {
                    refService.ref().resetPassword({
                        email: value
                    }, function(error) {
                        if (error) {
                            switch (error.code) {
                                case "INVALID_USER":
                                    alertify.error("The specified user account does not exist.");
                                    break;
                                default:
                                    alertify.error("Error resetting password:" + error);
                            }
                        }
                        else {
                            alertify.success("Password reset email sent successfully!");
                        }
                    });
                }
            );
        }

        $scope.oAuth = function(provider) {


            refService.ref().authWithOAuthPopup(provider, function(error, authData) {
                if (error) {
                    alertify.error("Register Error");
                }
                else {
                    console.log(authData)

                    //Checking If User Already Signed Up.
                    var checkSignUp = $firebaseObject(refService.ref().child("UserAuthInfo").child(authData.uid));
                    var usernames = $firebaseArray(refService.ref().child("UserAuthInfo"));
                    $scope.isDupe = false;
                    $scope.isUsernameDupeNested = false;

                    refService.ref().child("UserAuthInfo").child(authData.uid).once("value", function(snap) {

                        if (!(snap.val() == null)) {
                            alertify.error("You Already Signed Up With That Provider. Try logging in with that provider!");
                            refService.ref().unauth();
                        }
                        else {

                            vex.dialog.prompt({
                                message: 'What Email Do you want?',
                                placeholder: 'Email...',
                                callback: function(email) {

                                    usernames.$loaded(function(data) {
                                        for (var i = 0; i < data.length; i++) {

                                            if (data[i].Username == authData[provider].username) {
                                                $scope.isDupe = true;
                                                break;
                                            }
                                        }

                                        if ($scope.isDupe != true) {

                                            refService.ref().createUser({
                                                email: email,
                                                password: PASSWORDRESET(16)
                                            }, function(error, userData) {
                                                if (error) {
                                                    switch (error.code) {
                                                        case "EMAIL_TAKEN":
                                                            alertify.error("The new user account cannot be created because the email is already in use.");
                                                            break;
                                                        case "INVALID_EMAIL":
                                                            alertify.error("The specified email is not a valid email.");
                                                            break;
                                                        default:
                                                            alertify.error("Error creating user:", error);
                                                    }
                                                }
                                                else {

                                                    if (provider == 'twitter' || provider == 'google') {
                                                        
                                                         if (provider == 'google') {
                                                                    refService.ref().child("UserAuthInfo").child(authData.uid).set({
                                                                        Username: authData[provider].displayName,
                                                                        Email: email,
                                                                        UID: authData.uid,
                                                                        Image: authData[provider].profileImageURL,
                                                                        Moderator: false,
                                                                        BronzeBadge: 0,
                                                                        SilverBadge: 0,
                                                                        GoldBadge: 0,
                                                                        PlatinumBadge: 0,
                                                                        newUser: true,
                                                                        profileBackground: 'http://rmdeaftheatre.com/wp-content/uploads/2012/11/gray-background-3.jpg',
                                                                        followers: 0,
                                                                        following: 0,
                                                                        profileViews: 0,
                                                                        Precence: -1,
                                                                    })
                                                                    alertify.success("Sucessfully Reistered. Login Now!");
                                                                    refService.ref().unauth();
                                                                }
                                                                else {
                                                                    refService.ref().child("UserAuthInfo").child(authData.uid).set({
                                                                        Username: authData[provider].username,
                                                                        Email: email,
                                                                        UID: authData.uid,
                                                                        Image: authData[provider].profileImageURL,
                                                                        Moderator: false,
                                                                        BronzeBadge: 0,
                                                                        SilverBadge: 0,
                                                                        GoldBadge: 0,
                                                                        PlatinumBadge: 0,
                                                                        newUser: true,
                                                                        profileBackground: authData[provider].cachedUserProfile.profile_background_image_url_https,
                                                                        followers: 0,
                                                                        following: 0,
                                                                        profileViews: 0,
                                                                        Precence: -1,
                                                                    })
                                                                    alertify.success("Sucessfully Reistered. Login Now!");
                                                                    refService.ref().unauth();
                                                                }
                                                    }
                                                    else {
                                                        refService.ref().child("UserAuthInfo").child(authData.uid).set({
                                                            Username: authData[provider].username,
                                                            Email: email,
                                                            UID: authData.uid,
                                                            Image: authData[provider].profileImageURL,
                                                            Moderator: false,
                                                            BronzeBadge: 0,
                                                            SilverBadge: 0,
                                                            GoldBadge: 0,
                                                            PlatinumBadge: 0,
                                                            newUser: true,
                                                            profileBackground: 'http://rmdeaftheatre.com/wp-content/uploads/2012/11/gray-background-3.jpg',
                                                            followers: 0,
                                                            following: 0,
                                                            profileViews: 0,
                                                            Precence: -1,
                                                        })
                                                        alertify.success("Sucessfully Reistered. Login Now!");
                                                        refService.ref().unauth();
                                                    }


                                                }
                                            })

                                        }
                                        else {

                                            vex.dialog.prompt({
                                                message: 'Username is a duplicate. Please Choose another one.',
                                                placeholder: 'Username..',
                                                callback: function(username) {
                                                    for (var i = 0; i < data.length; i++) {

                                                        if (data[i].Username == username) {
                                                            $scope.isUsernameDupeNested = true;
                                                            break;
                                                        }
                                                    }

                                                    if ($scope.isUsernameDupeNested == false) {
                                                        refService.ref().createUser({
                                                            email: email,
                                                            password: PASSWORDRESET(16)
                                                        }, function(error, userData) {
                                                            if (error) {
                                                                switch (error.code) {
                                                                    case "EMAIL_TAKEN":
                                                                        alertify.error("The new user account cannot be created because the email is already in use.");
                                                                        break;
                                                                    case "INVALID_EMAIL":
                                                                        alertify.error("The specified email is not a valid email.");
                                                                        break;
                                                                    default:
                                                                        alertify.error("Error creating user:", error);
                                                                }
                                                            }
                                                            else {

                                                                if (provider == 'google') {
                                                                    refService.ref().child("UserAuthInfo").child(authData.uid).set({
                                                                        Username: authData[provider].displayName,
                                                                        Email: email,
                                                                        UID: authData.uid,
                                                                        Image: authData[provider].profileImageURL,
                                                                        Moderator: false,
                                                                        BronzeBadge: 0,
                                                                        SilverBadge: 0,
                                                                        GoldBadge: 0,
                                                                        PlatinumBadge: 0,
                                                                        newUser: true,
                                                                        profileBackground: 'http://rmdeaftheatre.com/wp-content/uploads/2012/11/gray-background-3.jpg',
                                                                        followers: 0,
                                                                        following: 0,
                                                                        profileViews: 0,
                                                                        Precence: -1,
                                                                    })
                                                                    alertify.success("Sucessfully Reistered. Login Now!");
                                                                    refService.ref().unauth();
                                                                }
                                                                else {
                                                                    refService.ref().child("UserAuthInfo").child(authData.uid).set({
                                                                        Username: authData[provider].username,
                                                                        Email: email,
                                                                        UID: authData.uid,
                                                                        Image: authData[provider].profileImageURL,
                                                                        Moderator: false,
                                                                        BronzeBadge: 0,
                                                                        SilverBadge: 0,
                                                                        GoldBadge: 0,
                                                                        PlatinumBadge: 0,
                                                                        newUser: true,
                                                                        profileBackground: authData[provider].cachedUserProfile.profile_background_image_url_https,
                                                                        followers: 0,
                                                                        following: 0,
                                                                        profileViews: 0,
                                                                        Precence: -1,
                                                                    })
                                                                    alertify.success("Sucessfully Reistered. Login Now!");
                                                                    refService.ref().unauth();
                                                                }

                                                            }
                                                        })
                                                    }
                                                    else {
                                                        alertify.error("The username you entered is another dupe... Refresh will be made soon. Please Give a Unique Username next time you register.")
                                                        refService.ref().unauth();
                                                        setTimeout(function() {
                                                            location.reload(true);
                                                        }, 10000)
                                                    }



                                                }
                                            })



                                        }
                                    });


                                }


                            })



                        }
                    });


                }

            })
        }



        $scope.oAuthLogin = function(provider) {

            refService.ref().authWithOAuthPopup(provider, function(error, authData) {
                if (error) {
                    alertify.error("Log in Failed. See Console for more details");
                    console.error("ERROR LOGIN : " + error);
                }
                else {


                    refService.ref().child("UserAuthInfo").child(authData.uid).once("value", function(snapLog) {

                        if (snapLog.val() == null) {
                            alertify.error("You Havent Signed Up With That Provider! Try Registering That Provider First!");
                            refService.ref().unauth();
                        }
                        else {

                            alertify.success("Sucessfully Logged In!");
                            $state.go('authHome.desc');

                        }

                    })



                }
            });
        }
        $scope.login = function() {
            refService.ref().authWithPassword({
                "email": $scope.user.email,
                "password": $scope.user.password
            }, function(error, authData) {
                if (error) {
                    alertify.error("Unsucessfull Authentication. See console for details")
                    console.error(error);
                }
                else {
                    alertify.success("Sucessfull Authentication");
                    $state.go('authHome')
                }
            });
        }



        $scope.regissterForm = function() {

            $scope.isUsernameDupe = false;
            refService.ref().child("UserAuthInfo").on("value", function(snapshot) {
                snapshot.forEach(function(childSNap) {

                    var key = childSNap.key();
                    var childData = childSNap.val();

                    if (childData.Username == $scope.register.username) {
                        $scope.isUsernameDupe = true;
                        return;
                    }
                })
                if ($scope.register.terms && ($scope.isUsernameDupe != true)) {
                    if ($scope.isUsernameDupe == false) {
                        refService.ref().createUser({
                            email: $scope.register.email,
                            password: $scope.register.password
                        }, function(error, userData) {
                            if (error) {
                                switch (error.code) {
                                    case "EMAIL_TAKEN":
                                        alertify.error("The new user account cannot be created because the email is already in use.");
                                        break;
                                    case "INVALID_EMAIL":
                                        alertify.error("The specified email is not a valid email.");
                                        break;
                                    default:
                                        alertify.error("Error creating user:", error);
                                }
                            }
                            else {
                                $scope.$evalAsync(
                                    function() {
                                        var letterAvatar = letterAvatarService.getLetterURL($scope.register.username, $scope.loadImageJSON);
                                        setTimeout(function() {
                                            console.log(letterAvatar);
                                            refService.ref().child("UserAuthInfo").child(userData.uid).set({
                                                Username: $scope.register.username,
                                                Email: $scope.register.email,
                                                UID: userData.uid,
                                                Image: letterAvatarService.getLetterURL($scope.register.username),
                                                Moderator: false,
                                                BronzeBadge: 0,
                                                SilverBadge: 0,
                                                GoldBadge: 0,
                                                PlatinumBadge: 0,
                                                newUser: true,
                                                profileBackground: 'http://rmdeaftheatre.com/wp-content/uploads/2012/11/gray-background-3.jpg',
                                                followers: 0,
                                                following: 0,
                                                profileViews: 0,
                                                Precence: -1,
                                            });

                                        }, 1500)

                                        alertify.success("Sucessfully Registered")
                                    }
                                );

                            }
                        });
                    }

                }
                else if ($scope.isUsernameDupe == true) {
                    alertify.error("Username already in use");
                }
                else {
                    alertify.warning("You Must Accept Terms and Services Before Procceding!")
                }
            })




        }

        $scope.setResponse = function() {

            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Sucess')
                .textContent('Recaptcha Submited Sucessfully')
                .ariaLabel('Offscreen Demo')
                .ok('Redirecting...')
                .openFrom({
                    top: -50,
                    width: 30,
                    height: 80
                })
                .closeTo({
                    left: 1500
                })
            );
            setTimeout(function() {
                $mdDialog.cancel();
            }, 1000);
        }

    }

})(angular);