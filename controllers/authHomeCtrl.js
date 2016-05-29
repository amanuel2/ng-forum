(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('authHome', ["$scope", "$firebaseObject", "$state", "$mdDialog", "$mdMedia", "$firebaseArray", "refService", "currentAuth","$mdBottomSheet", authHomeCtrl])

    function authHomeCtrl($scope, $firebaseObject, $state, $mdDialog, $mdMedia, $firebaseArray, refService, currentAuth,$mdBottomSheet) {
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

       

    }

})(angular);