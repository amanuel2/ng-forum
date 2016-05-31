(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('authHome', ["$scope", "$firebaseObject", "$state", "$mdDialog", "$mdMedia", "$firebaseArray", "refService", "$mdBottomSheet", authHomeCtrl])

    function authHomeCtrl($scope, $firebaseObject, $state, $mdDialog, $mdMedia, $firebaseArray, refService, $mdBottomSheet) {
        $state.go('authHome.desc')

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
            console.log(currentAuth);
            refService.ref().onAuth(function(authData) {
                console.log(authData)
            })
            var tour;

            tour = new Shepherd.Tour({
                defaults: {
                    classes: 'shepherd-theme-arrows',
                    scrollTo: true
                }
            });

            tour.addStep('Avatar', {
                title: 'Thats your avatar',
                text: 'Click on it to change settings, see profile, or logout.',
                attachTo: '.user-avatar-wrapper',
                advanceOn: '.toolbar_new_topic'
            });
            
            tour.addStep('New Topic', {
                title: 'Creating a new topic',
                text: 'To Create a new topic, click on the new topic button',
                attachTo: '.toolbar_new_topic',
                advanceOn: '.listdemoListControls'
            });
            
            tour.addStep('Topics', {
                title: 'Topics',
                text: 'These are the topics in this forum',
                attachTo: '.listdemoListControls',
                advanceOn: '.noright'
            });
            
            tour.addStep('Topic', {
                title: 'Topic',
                text: 'Click on topic, to see its value!',
                attachTo: '.noright',
                advanceOn: '.user-avatar-wrapper'
            });

            var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child(currentAuth.uid));
            obj.$loaded(function(data) {
                    $scope.Username = data.Username;
                    $scope.Email = data.Email;
                    $scope.UID = currentAuth.uid;
                    $scope.image = data.Image;

                    if (data.newUser == true) {
                        //NewUser Vec
                        vex.defaultOptions.className = 'vex-theme-wireframe';
                        vex.dialog.prompt({
                          message: 'Welcome To Ng-Forum! Please type in your email(Changing Password)',
                          placeholder: 'Type in email to change pass',
                          callback: function(email) {
                              
                              vex.dialog.prompt({
                          message: 'Welcome To Ng-Forum! Please type in your old Password(Changing Password)',
                          placeholder: 'Type in old Password to change pass',
                          callback: function(oldPass) {
                                
                                vex.dialog.prompt({
                              message: 'Welcome To Ng-Forum! Please type in your new Password(Changing Password)',
                              placeholder: 'Type in new Password to change pass',
                              callback: function(newPass) {
                              
                              
                                    refService.ref().changePassword({
                                        email: email,
                                        oldPassword: oldPass,
                                        newPassword: newPass
                                    }, function(error) {
                                        if (error) {
                                            switch (error.code) {
                                                case "INVALID_PASSWORD":
                                                    alertify.error("The specified user account password is incorrect. Therfore Exiting for security purposes. Sign In Again please, And fill correct info next time!");
                                                    setTimeout(function(){
                                                        refService.ref().unauth();
                                                        location.reload();
                                                        location.reload();
                                                    }, 1500)
                                                    
                                                    break;
                                                case "INVALID_USER":
                                                    alertify.error("The specified user account does not exist. Therfore Exiting for security purposes. Sign In Again please, And fill correct info next time!");
                                                    setTimeout(function(){
                                                        refService.ref().unauth();
                                                        location.reload();
                                                        location.reload();
                                                    }, 1500)
                                                    break;
                                                default:
                                                    alertify.error("Error changing password. Therfore Exiting for security purposes. Sign In Again please, And fill correct info next time!");
                                                    setTimeout(function(){
                                                        refService.ref().unauth();
                                                        location.reload();
                                                        location.reload();
                                                    }, 1500)
                                                
                                            }
                                        }
                                        else {
                                            alertify.success("User password changed successfully! Click Cancel");
                                            
                                          refService.ref().child("UserAuthInfo").child(currentAuth.uid).update({
                                                newUser: false
                                            })
                                            
                                            tour.start();
  

                                        }
                                    });
                              
                              
                              
                                  
                                 }
                              })
                          
                          
                              
                             }
                          })
                              
                          }
                        });



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
            $state.go("home");
            window.location.href = "#home"
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