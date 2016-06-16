(function(angular){
 'use strict';    
     angular
     .module('ForumApp')
     .controller('profileCtrl', ["$scope","$firebaseObject","refService","timeService","$stateParams", profileCtrl])

    function profileCtrl($scope,$firebaseObject,refService,timeService,$stateParams){
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
       
      
       String.prototype.replaceAll = function(str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
       } 


         var arrayOfPrevious5Days = [];        
         var date = Date.now();
         var date = parseInt(date);
         var newDate = new Date(parseInt(date));
        
         newDate = JSON.stringify(newDate);
         newDate = newDate.replaceAll('"', '');
         newDate = newDate.substring(8,10);
         var dateNum = parseInt(newDate);
         var dateDiff5 = dateNum-5;
         for(var i=dateNum; i>dateDiff5; i--)
              arrayOfPrevious5Days.push(i);
         var index_zero = arrayOfPrevious5Days[0];
         var index_one = arrayOfPrevious5Days[1];
         var index_two = arrayOfPrevious5Days[2];
         var index_three = arrayOfPrevious5Days[3];
         var index_four = arrayOfPrevious5Days[4];
           
        
        console.log(arrayOfPrevious5Days)
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