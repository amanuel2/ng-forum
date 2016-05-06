(function(angular){
    var app = angular.module('ForumApp')
    
    app.controller('usernameChangeCtrl', ["$scope","refService","currentAuth","$mdDialog","hashService", usernameChangeCtrl])
    
    function usernameChangeCtrl($scope,refService,currentAuth,$mdDialog,hashService){
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.changeUsernameDialog = function(){
            var username = $scope.usernameNew;
            refService.ref().child("UserAuthInfo").child(currentAuth.uid).update({
                Username : username
            })
            $mdDialog.cancel();
        }
    }
})(angular);