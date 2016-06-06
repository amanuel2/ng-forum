(function(angular){
    var app = angular.module('ForumApp')
    
    app.controller('usernameChangeCtrl', ["$scope","refService","currentAuth","$mdDialog", usernameChangeCtrl])
    
    function usernameChangeCtrl($scope,refService,currentAuth,$mdDialog){
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
            //Updating Topics
                    refService.ref().child("Topics").once("value", function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            if (childData.UID == currentAuth.uid) {
                                refService.ref().child("Topics").child(childData.pushKey).update({
                                    Username: username
                                })
                            }
                        })
                    })
                    
            //Updating Replise
                    
                    refService.ref().child("Replies").once("value", function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            childSnapshot.forEach(function(EvenChild){
                                var keyNest = EvenChild.key();
                                var childDataNest = EvenChild.val();
                                if(childDataNest.replyCreatorUID == currentAuth.uid){
                                  refService.ref().child("Replies").child(key).child(childDataNest.pushKey).update
                                    ({
                                        replyCreatorUsername : username                   
                                    })
                                }
                            })
                        })
                    })
            location.reload(true);
                location.reload(true);        
            $mdDialog.cancel();
        }
    }
})(angular);