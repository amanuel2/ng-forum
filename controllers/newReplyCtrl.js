(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('newReplyCtrl', ["$scope", "$firebaseObject", "$mdDialog", "refService", "currentAuth", "replyService", "timeService", "$stateParams", "$firebaseArray", newReplyCtrl])

    function newReplyCtrl($scope, $firebaseObject, $mdDialog, refService, currentAuth, replyService, timeService, $stateParams, $firebaseArray) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.submitNewReply = function() {
            $scope.currentAuthGet = refService.ref().getAuth();

            $scope.numRepliesAlready = $firebaseArray(refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST))

            $scope.numRepliesAlready.$loaded(function(data) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGet.uid).on("value", function(snapshot) {
                    $scope.userAvatar = snapshot.val().Image;
                    $scope.userName = snapshot.val().Username;
                    $scope.userEmail = snapshot.val().Email;

                })
                var pushingR = refService.ref().child("Replies").child(replyService.creatorUsername + replyService.postNum).push({
                    replyCreatorUsername: $scope.userName,
                    replyCreatorAvatar: $scope.userAvatar,
                    replyCreatorEmail: $scope.userEmail,
                    replyCreatorUID: $scope.currentAuthGet.uid,
                    replyCreatorValue: $scope.reply.sentence,
                    replyCreatorDate: Date.now(),
                    Replynum: data.length,
                    replyCreatorDateParsed: timeService.getTimeF(new Date(parseInt(Date.now()))),
                    topicCreatorUsername: replyService.creatorUsername,
                    topicCreatorUID: replyService.creatorUID,
                    topicCreatorTitle: replyService.creatorTitle,
                    topicCreatorAvatar: replyService.creatorAvatar,
                    topicCreatorSince: replyService.timeSinceCreated

                })
                refService.ref().child("Replies").child(replyService.creatorUsername + replyService.postNum).child(pushingR.key()).update({
                    pushKey: pushingR.key()
                })

                $scope.lastAct = $firebaseObject(refService.ref().child("Topics"));
                $scope.lastAct.$loaded(function(dataLast) {
                    dataLast.forEach(function(snapDataLastAct) {
                        if (snapDataLastAct.Postnum == $stateParams.POST) {
                            refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                LastActivity: Date.now(),
                            })
                            refService.ref().child("Topics").child(snapDataLastAct.pushKey).once("value", function(snapREPVIEWS) {
                                if (!snapREPVIEWS.val().RepliesNum) {
                                    console.log(snapREPVIEWS)
                                    refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                        RepliesNum: (1)
                                    })
                                } else {
                                    refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                        RepliesNum: (snapREPVIEWS.val().RepliesNum + 1)
                                    })
                                }


                            })
                        }
                    })
                })
                $mdDialog.cancel();


            })

        }

    }
})(angular);