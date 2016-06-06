(function(angular){
    var app = angular.module('ForumApp')
    app.controller('profileCtrl', ["$scope","$firebaseObject","refService","timeService", profileCtrl])

    function profileCtrl($scope,$firebaseObject,refService,timeService){
       $scope.currentAuthGetPro = refService.ref().getAuth();
       $scope.precence = "";
       var userRef = new Firebase('https://uniquecodersforums.firebaseio.com/presence/' + $scope.currentAuthGetPro.uid);
       userRef.on("value", function(snapshotPrecence){
           if(snapshotPrecence.val() == "Online")
                $scope.precence = "Online"
                
            else if(snapshotPrecence.val() == "Idle")  
                $scope.precence = "Idle"
                
            else
                $scope.precence = timeService.getTimeF(new Date(parseInt(snapshotPrecence.val())));
            
                
       })
       
         var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child($scope.currentAuthGetPro.uid));
         var objPres = $firebaseObject(refService.ref().child("presence"));
         
         
        obj.$loaded(function(data) {
                $scope.Username = data.Username;
                $scope.Email = data.Email;
                $scope.UID = $scope.currentAuthGetPro.uid;
                $scope.image = data.Image;
                $scope.backImage = data.profileBackground
                $scope.desc = data.Description || "The User is Silent as the butterflies..."
                $scope.Moderator = data.Moderator;
                $scope.ProfileViews = data.profileViews
                $scope.Followers = data.followers;
                $scope.Following = data.following;
            },
            function(error) {
                console.error("Error:", error);
            }
        
        );
        
        objPres.$loaded(function(data){
            $scope.isPresent = data[$scope.currentAuthGetPro.uid];
            if($scope.isPresent !== 'Online'){
                $scope.isPresent = timeService.getTimeF(new Date(parseInt($scope.isPresent)));
            }
        })
        
       
    }
})(angular);