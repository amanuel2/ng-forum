(function(angular){
    var app = angular.module('ForumApp')
    
    app.controller('imageChangeCtrl', ["$scope","refService","currentAuth","$mdDialog","hashService","encodeImageToBase64","$firebaseObject", imageChangeCtrl])
    
    function imageChangeCtrl($scope,refService,currentAuth,$mdDialog,hashService,encodeImageToBase64,$firebaseObject){
          $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        
        $scope.uploadFile = function(event){
            var doc = document.getElementById('inputFileToLoad');
            var file = document.getElementById('inputFileToLoad').files;
            var base64Image = encodeImageToBase64.encode(doc,file,refService.ref(), currentAuth.uid);
            
        };
    }
})(angular);
