(function(angular){
    var app = angular.module('ForumApp');
    
    app.controller('descChangeCtrl',["$scope","$mdDialog","$mdMedia","currentAuth","refService", descChangeCtrl])
    
    function descChangeCtrl($scope,$mdDialog,$mdMedia,currentAuth,refService){
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.change = function(desc){
            if(desc.length > 5){
                refService.ref().child("UserAuthInfo").child(currentAuth.uid).update({
                    Description : desc
                }, function(error) {
                  if (error) {
                    alertify.error('Synchronization failed');
                  } else {
                    alertify.success('Synchronization succeeded');
                    $mdDialog.cancel();
                  }
                  })
                
            }else{
                alertify.error("LEGNTH HAS TO BE ATLEAST 5 CHARACTERS!")
            }
        }
    }
})(angular);