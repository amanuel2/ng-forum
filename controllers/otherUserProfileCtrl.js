(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('otherUserProfileCtrl', ["$scope", "currentAuth", "$stateParams", "refService","$mdDialog", "$firebaseObject","$state","otherUserService", otherUserProfileCtrl])

    function otherUserProfileCtrl($scope, currentAuth, $stateParams, refService,$mdDialog, $firebaseObject,$state,otherUserService) {

        var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child($stateParams.UID));
        obj.$loaded(function(data) {
                $scope.info = otherUserService.getUserInfo()
                $scope.ACTUALinfo = otherUserService.ACTUALgetUserInfo();
                console.log($scope.ACTUALinfo)
                $scope.otherUserEmail = $scope.info.replyCreatorEmail
                $scope.otherUserImage = $scope.info.replyCreatorAvatar
                $scope.otherUserUID = $scope.info.replyCreatorUID
                $scope.otherUserUsername = $scope.info.replyCreatorUsername;
                if($scope.ACTUALinfo.Moderator == false)
                {
                    $scope.otherMod = "Not a Moderator";
                }
                else{
                     $scope.otherMod = "Respected Moderator";
                }
                $scope.otherDesc = $scope.ACTUALinfo.Description || "This user is silent as the butterflies";
            },
            function(error) {
                console.error("Error:", error);
            }
        );


        var count = 0;
        $scope.userInfoTopics = [];

        refService.ref().child("Topics").once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

                
                var key = childSnapshot.key();
                var childData = childSnapshot.val();

                if (childData.UID == currentAuth.uid) {
                    $scope.userInfoTopics[count] = {
                        "Title": childData.Title,
                        "UID": childData.UID,
                        "DateCreated": childData.DateCreated,
                        "Email ": childData.Email,
                        "Username ": childData.Username,
                        "Value ": childData.Value,
                        "pushKey": childData.pushKey
                    }
                    count++;
                }

            })

        })
        
         $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        

$scope.privateMessageStart = function(username,mod,desc,image){
    $state.go("authHome.privateMes")
}
$scope.goToTopic = function(top){
    $state.go("authHome.topic", {
        "AVATAR": $scope.otherUserImage,
        "DATE": top.DateCreated,
        "EMAIL": $scope.otherUserEmail,
        "TITLE": top.Title,
        "UID": top.UID,
        "USERNAME": top.Username,
        "VALUE": top.Value
      })
}

    }
})(angular);