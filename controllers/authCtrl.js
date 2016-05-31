(function(angular) {

    var app = angular.module('ForumApp');

    app.controller('authCtrl', ["$scope", "$state", "refService", "$firebaseObject", "hashService", "authCheckTrueService", "$mdDialog", authCtrl]);

    function authCtrl($scope, $state, refService, $firebaseObject, hashService, authCheckTrueService, $mdDialog) {
        authCheckTrueService.checkAuth(refService.ref(), "authHome.desc");

        $scope.forgotPass = function() {
            console.log("Hello");
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
                        } else {
                            alertify.success("Password reset email sent successfully!");
                        }
                    });
                }
            );
        }
        
        $scope.oAuth = function(provider) {
                //TODO
                // if (provider == 'facebook') {
                //     refService.ref().authWithOAuthPopup("facebook", function(error, authData) {
                //         if (error) {
                //             console.log("Login Failed!", error);
                //         } else {
                //             console.log("Authenticated successfully with payload:", authData);
                //         }
                //     });
                // } else if (provider == 'twitter') {
                //     refService.ref().authWithOAuthPopup("twitter", function(error, authData) {
                //         if (error) {
                //             console.log("Login Failed!", error);
                //         } else {
                //             console.log("Authenticated successfully with payload:", authData);
                //         }
                //     });
                // } else if (provider == 'github') {
                //     refService.ref().authWithOAuthPopup("github", function(error, authData) {
                //         if (error) {
                //             console.log("Login Failed!", error);
                //         } else {
                //             console.log("Authenticated successfully with payload:", authData);
                //         }
                //     });
                // } else {
                //     refService.ref().authWithOAuthPopup("google", function(error, authData) {
                //         if (error) {
                //             console.log("Login Failed!", error);
                //         } else {
                //             console.log("Authenticated successfully with payload:", authData);
                //         }
                //     });
                // }
            }

        $scope.login = function() {
            refService.ref().authWithPassword({
                "email": $scope.user.email,
                "password": $scope.user.password
            }, function(error, authData) {
                if (error) {
                    alertify.error(`Error. Tested With Email. If No Green Signs shown, you 
                            have an unsucessfull Authentication`);
                    var UsernameLogin = $firebaseObject(refService.ref().child("UserAuthInfo"));
                    refService.ref().child("UserAuthInfo").once("value", function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {

                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            if (childData.Username == $scope.user.email) {
                                var IV = '36ebe205bcdfc499a25e6923f4450fa8';
                                var KEYH = 'be410fea41df7162a679875ec131cf2c';
                                var hashedCheck = hashService.AESdyc(childData.Password, KEYH, IV);

                                if (hashedCheck == $scope.user.password) {
                                    refService.ref().authWithPassword({
                                        "email": childData.Email,
                                        "password": $scope.user.password
                                    }, function(err, authData) {
                                        if (err) {
                                            alertify.error("Login Failed! " + err)
                                        } else {
                                            alertify.success("Authenticated successfully");
                                            $state.go('authHome');
                                        }
                                    })
                                } else {
                                    alertify.error("Login Failed! Wrong Password" + error);
                                }
                            } else {
                                alertify.error("Login Failed! Wrong Username/Email" + error);
                            }

                        });
                    });

                } else {
                    alertify.success("Authenticated successfully");
                    $state.go('authHome');
                }
            });
        }

        /*    var captchaContainer = null;
            var loadCaptcha = function() {
              captchaContainer = grecaptcha.render('captcha_container', {
                'sitekey' : '6Ld65iATAAAAAGoMGDAGTGcAP-GgS1KAa6AD2lU1',
                'callback' : function(response) {
                  alert(response);
                }
              });
            };

          loadCaptcha();*/
          function PASSWORDRESET(length) {
                 var possibleChars = ['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?_-'];
                 var password = '';
                 for(var i = 0; i < length; i += 1) {
                   password += possibleChars[Math.floor(Math.random() * possibleChars.length)];
                 }
                 return password;
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
                if ($scope.register.terms && $scope.isUsernameDupe != true) {
                    refService.ref().createUser({
                        email: $scope.register.email,
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
                        } else {
                            refService.ref().child("UserAuthInfo").on("value", function(snapshot) {
                                refService.ref().resetPassword({
                                  email: $scope.register.email
                                }, function(error) {
                                  if (error) {
                                    switch (error.code) {
                                      case "INVALID_USER":
                                        console.log("The specified user account does not exist.");
                                        break;
                                      default:
                                        console.log("Error resetting password:", error);
                                    }
                                  } else {
                                    alertify.success("Confirmaton Sent to " + $scope.register.email);
                                  }
                                });
                                
                                refService.ref().child("UserAuthInfo").child(userData.uid).set({
                                    Username: $scope.register.username,
                                    Email: $scope.register.email,
                                    UID: userData.uid,
                                    Image: 'http://cs624223.vk.me/v624223037/2b1bb/GRTKddkmXiw.jpg',
                                    Moderator: false,
                                    BronzeBadge: 0,
                                    SilverBadge: 0,
                                    GoldBadge: 0,
                                    PlatinumBadge: 0,
                                    newUser : true,
                                });

                            })


                        }
                    });
                } else if ($scope.isUsernameDupe == true) {
                    alertify.error("Username already in use");
                } else {
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