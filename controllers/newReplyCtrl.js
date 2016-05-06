(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('newReplyCtrl', ["$scope", "$mdDialog", "refService", "currentAuth","replyService","timeService", newReplyCtrl])

    function newReplyCtrl($scope, $mdDialog, refService, currentAuth,replyService,timeService) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.submitNewReply = function(){
            refService.ref().child("UserAuthInfo").child(currentAuth.uid).on("value", function(snapshot) {
                $scope.userAvatar = snapshot.val().Image;
                $scope.userName = snapshot.val().Username;
                $scope.userEmail = snapshot.val().Email;

            })
            refService.ref().child("Replies").child(replyService.creatorUsername + replyService.creatorDate).push({
                replyCreatorUsername : $scope.userName,
                replyCreatorAvatar : $scope.userAvatar,
                replyCreatorEmail : $scope.userEmail,
                replyCreatorUID : currentAuth.uid,
                replyCreatorValue : $scope.reply.sentence,
                replyCreatorDate : Date.now(),
                replyCreatorDateParsed : timeService.getTimeF(new Date(parseInt(Date.now()))),
                topicCreatorUsername : replyService.creatorUsername,
                topicCreatorUID : replyService.creatorUID,
                topicCreatorTitle : replyService.creatorTitle,
                topicCreatorAvatar : replyService.creatorAvatar,
                topicCreatorSince : replyService.timeSinceCreated
                
            })
            $mdDialog.hide();
        }

    }
})(angular);