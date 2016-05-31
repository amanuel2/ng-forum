(function(angular){
    var app = angular.module('ForumApp');
    
    app.controller('editReplyCtrl', ["$scope","$mdDialog","currentAuth","refService","editTopicService","editReplyService", editReplyFunc])
    
    function editReplyFunc($scope,$mdDialog,currentAuth,refService,editTopicService,editReplyService){
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.editREPLY = function(){
            var sent = $scope.reply.sentence;
            var topicPushKey = editReplyService.getPushK();
            console.log(topicPushKey);
            var POST = editReplyService.getDatee();
            var USERNAME = editReplyService.getName();
            var UIDUSERNAME = editReplyService.getTopicUID();
            
            
            refService.ref().child("Replies").child(USERNAME+POST).on("value", function(snapshot){
                snapshot.forEach(function(childSnap){
                    var key = childSnap.key();
                    var childData = childSnap.val();
                    if(childData.pushKey == topicPushKey){
                        refService.ref().child("Replies").child(USERNAME+POST).child(childData.pushKey).update({
                            replyCreatorValue : sent
                        })
                    }
                })
            })
            
        }

    }
    
})(angular);