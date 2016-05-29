(function(angular){
    var app = angular.module('ForumApp');
    
    app.controller('emailSettingsCtrl', ["$scope","refService","currentAuth","$mdDialog","hashService", emailSettingsCtrl])
    
    function emailSettingsCtrl($scope,refService,currentAuth,$mdDialog,hashService){

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.changeEmailDialog = function(){
            var email = $scope.emailChange || $scope.emailChange.toString;
            var oldEmail = $scope.emailChangeOld;
            var oldPassword = hashService.AESCrypt($scope.passwordChangeOld,'dsds','dsds') 
            refService.ref().changeEmail({
                oldEmail: oldEmail,
                newEmail: email,
                password: $scope.passwordChangeOld
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
                            alertify.error("Error creating user:" +  error);
                    }
                } else {
                    refService.ref().child("UserAuthInfo").child(currentAuth.uid).update({
                        Email: email
                    })
                    
                    
                    alertify.success("User email changed successfully!");
            //Updating Topics
                    refService.ref().child("Topics").once("value", function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            if (childData.UID == currentAuth.uid) {
                                refService.ref().child("Topics").child(childData.pushKey).update({
                                    Email: email
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
                                        replyCreatorEmail : email                   
                                    })
                                }
                            })
                        })
                    })
                    $mdDialog.cancel();
                }
            });
        }
    }
})(angular);