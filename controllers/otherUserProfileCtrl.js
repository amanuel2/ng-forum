(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('otherUserProfileCtrl', ["$scope", "currentAuth", "$stateParams", "refService", "$firebaseObject","$state", otherUserProfileCtrl])

    function otherUserProfileCtrl($scope, currentAuth, $stateParams, refService, $firebaseObject,$state) {

        var obj = $firebaseObject(refService.ref().child("UserAuthInfo").child($stateParams.UID));
        obj.$loaded(function(data) {
                $scope.otherUserEmail = data.Email;
                $scope.otherUserImage = data.Image;
                $scope.otherUserUID = data.UID;
                $scope.otherUserUsername = data.Username;
                $scope.otherDesc = data.Description || "This user is silent as the butterflies";
                $scope.otherMod = data.Moderator;
                console.log(data)
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