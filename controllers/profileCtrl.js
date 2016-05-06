(function(angular){
    var app = angular.module('ForumApp')
    app.controller('profileCtrl', ["$scope","currentAuth","$firebaseObject","refService", profileCtrl])

    function profileCtrl($scope,currentAuth,$firebaseObject,refService){
       
         var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child(currentAuth.uid));
        obj.$loaded(function(data) {
                console.log(data)
                $scope.Username = data.Username;
                $scope.Email = data.Email;
                $scope.UID = currentAuth.uid;
                $scope.image = data.Image;
                $scope.desc = data.Description || "The User is Silent as the butterflies..."
            },
            function(error) {
                console.error("Error:", error);
            }
        );
        
    }
})(angular);