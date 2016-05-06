(function(angular){
    var app = angular.module('ForumApp')
    
    app.controller('passwordChangeCtrl', ["$scope","refService","currentAuth","$mdDialog","hashService", passwordChangeCtrl])
    
    function passwordChangeCtrl($scope,refService,currentAuth,$mdDialog,hashService){
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
          
          var actualNewPassword = hashService.AESCrypt($scope.passwordChangeNew, 'dada', 'dada')
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
                refService.ref().child("UserAuthInfo").child(currentAuth.uid).update({
                  Password : actualNewPassword
                })
                alertify.success("User password changed successfully!");
                $mdDialog.cancel();
              }
            });
        }
    }
})(angular);