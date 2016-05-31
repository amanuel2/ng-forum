(function(angular){
    var app = angular.module('ForumApp');
    
    app.controller('editTopicCtrl', ["$scope","$mdDialog","currentAuth","refService","editTopicService", editTopicFunc])
    
    function editTopicFunc($scope,$mdDialog,currentAuth,refService,editTopicService){
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.submitNewEdit = function(){
            var newSentence = $scope.edit.sentence;
            refService.ref().child("Topics").on("value", function(snapshot){
                snapshot.forEach(function(childSnapshot){
                    var key = childSnapshot.key();
                    var childData = childSnapshot.val();
                    var DATE = editTopicService.getDateCreated();
                   if(childData.UID == currentAuth.uid && childData.DateCreated == DATE){
                       refService.ref().child("Topics").child(childData.pushKey).update({
                           Value: newSentence
                       })
                   }
                })
                $mdDialog.cancel();
            })
        }

    }
    
})(angular);