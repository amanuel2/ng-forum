(function(angular){
    var app = angular.module('ForumApp')
    
    app.controller('passwordChangeCtrl', ["$scope","refService","currentAuth","$mdDialog", passwordChangeCtrl])
    
    function passwordChangeCtrl($scope,refService,currentAuth,$mdDialog){
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.changePasswordDialog = function(){

            refService.ref().changePassword({
              email: $scope.emailNormal,
              oldPassword: $scope.passwordChangeOld,
              newPassword: $scope.passwordChangeNew
            }, function(error) {
              if (error) {
                switch (error.code) {
                  case "INVALID_PASSWORD":
                    alertify.error("The specified user account password is incorrect.");
                    break;
                  case "INVALID_USER":
                    alertify.error("The specified user account does not exist.");
                    break;
                  default:
                    alertify.error("Error changing password:", error);
                }
              } else {
                alertify.success("User password changed successfully!");
                location.reload(true);
                location.reload(true);
                $mdDialog.cancel();
              }
            });
        }
    }
})(angular);