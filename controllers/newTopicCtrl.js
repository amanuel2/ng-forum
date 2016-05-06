(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('newTopicCtrl', ["$scope", "$mdDialog", "refService", "currentAuth", newTopicCtrl])

    function newTopicCtrl($scope, $mdDialog, refService, currentAuth) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.submitNewTopic = function() {

            refService.ref().child("UserAuthInfo").child(currentAuth.uid).on("value", function(snapshot) {
                $scope.userAvatar = snapshot.val().Image;
                $scope.userName = snapshot.val().Username;
                $scope.userEmail = snapshot.val().Email;

              var pushing = refService.ref().child("Topics").push({
                    Title: $scope.topic.title,
                    Value: $scope.topic.sentence,
                    DateCreated: Date.now(),
                    Username: $scope.userName,
                    Email: $scope.userEmail,
                    Avatar: $scope.userAvatar,
                    UID: currentAuth.uid,
                    Votes : 0
                })
                
                refService.ref().child("Topics").child(pushing.key()).update({
                    pushKey : pushing.key()
                })
            })
            $mdDialog.hide();
        }

    }
})(angular);