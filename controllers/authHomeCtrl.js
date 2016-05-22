(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('authHome', ["$scope", "$firebaseObject", "$state", "$mdDialog", "$mdMedia", "$firebaseArray", "refService", "currentAuth", authHomeCtrl])

    function authHomeCtrl($scope, $firebaseObject, $state, $mdDialog, $mdMedia, $firebaseArray, refService, currentAuth) {
        $state.go('authHome.desc')
        console.log(currentAuth);
        var auth = refService.ref().getAuth() ? console.log() : $state.go("home")




        var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child(currentAuth.uid));
        obj.$loaded(function(data) {
                console.log(data)
                $scope.Username = data.Username;
                $scope.Email = data.Email;
                $scope.UID = currentAuth.uid;
                $scope.image = data.Image;
            },
            function(error) {
                console.error("Error:", error);
            }
        );

        $scope.goToProfile = function(){
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

        $scope.goToSettings = function(){
            console.log($scope.UID)
            console.log($scope.Username)
            $state.go("authHome.settings", {
                "UID" : $scope.UID,
                "USERNAME" : $scope.Username
            })
        }

        $scope.showNewTopic = function(ev) {
            if (ev) {


                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'newTopicCtrl',
                        templateUrl: 'views/newTopic.html',
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


            }
        }

    }

})(angular);