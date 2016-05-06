(function(angular) {
    var app = angular.module('ForumApp');

    app.controller("settingsCtrl", ["$scope", "currentAuth", "refService", "$stateParams", "$mdDialog", "$mdMedia", "$firebaseObject", settingsCtrl])

    function settingsCtrl($scope, currentAuth, refService, $stateParams, $mdDialog, $mdMedia, $firebaseObject) {

        //Setting Infos....
        $scope.userInfo = $firebaseObject(refService.ref().child("UserAuthInfo").child($stateParams.UID))
        $scope.passwordSHARP = "********"
        $scope.uid = currentAuth.uid;
        
    
        $scope.changeEmail = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'emailSettingsCtrl',
                    templateUrl: 'views/settings/emailChange.html',
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

                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        }

        $scope.descriptonChange = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'descChangeCtrl',
                    templateUrl: 'views/settings/descriptonChange.html',
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

                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        }

        $scope.changePassword = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'passwordChangeCtrl',
                    templateUrl: 'views/settings/passwordChange.html',
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

                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        }
        $scope.changeUsername = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'usernameChangeCtrl',
                    templateUrl: 'views/settings/usernameChange.html',
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

                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        }
        
        $scope.changeImage = function(ev){
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'imageChangeCtrl',
                    templateUrl: 'views/settings/imageChange.html',
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

                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });  
        }
    }

})(angular);