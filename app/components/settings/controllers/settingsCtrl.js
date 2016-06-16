(function(angular) {

 'use strict';    
    angular
        .module('ForumApp')
        .controller("settingsCtrl", ["$scope", "refService", "$stateParams", "$mdDialog", "$mdMedia", "$firebaseObject", settingsCtrl])

    function settingsCtrl($scope, refService, $stateParams, $mdDialog, $mdMedia, $firebaseObject) {

        //Setting Infos....
        $scope.currentAuthSet = refService.ref().getAuth();
    
        $scope.userInfo = $firebaseObject(refService.ref().child("UserAuthInfo").child($stateParams.UID))
        $scope.passwordSHARP = "********"
        $scope.uid = $scope.currentAuthSet.uid;
        $scope.desc = "See your descripton in the profile."
        
        function isPassChange(){
           if($scope.currentAuthSet.provider == 'twitter' || $scope.currentAuthSet.provider == 'google'
                || $scope.currentAuthSet.provider == 'github')
            {
                return true;
            } 
            else{
                return false;
            }
        }
        
        
    
        $scope.changeEmail = function(ev) {
            if(isPassChange() == true)
            {
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.getElementsByTagName("body")))
                    .clickOutsideToClose(true)
                    .title('Email')
                    .textContent('Cant change email since your logged in from a provider')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                ); 
            }
            else{
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'emailSettingsCtrl',
                    templateUrl: 'app/components/settings/mini-view/emailChange.html',
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

        $scope.descriptonChange = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'descChangeCtrl',
                    templateUrl: 'app/components/settings/mini-view/descriptonChange.html',
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
            
            if(isPassChange() == true)
            {
               $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.getElementsByTagName("body")))
                    .clickOutsideToClose(true)
                    .title('Password')
                    .textContent('Cant change password since your logged in from a provider')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                ); 
            }
            else{
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'passwordChangeCtrl',
                    templateUrl: 'app/components/settings/mini-view/passwordChange.html',
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
        $scope.changeUsername = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: 'usernameChangeCtrl',
                    templateUrl: 'app/components/settings/mini-view/usernameChange.html',
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
                    templateUrl: 'app/components/settings/mini-view/imageChange.html',
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