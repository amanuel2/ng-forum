(function(){
    'use strict';
    
    angular
          .module('ForumApp')
          .controller('viewTopicLikes', ["$scope","$mdDialog","topicLikesService","refService","$stateParams", viewTopicLikesfunc])
          
          function viewTopicLikesfunc($scope,$mdDialog,topicLikesService,refService,$stateParams) {
              $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            topicLikesService.resetInfo();
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
          $scope.avatars = [];
              $scope.num_likes = topicLikesService.getInfo1();
              $scope.rep = topicLikesService.getInfo2();
              refService.ref().child("Replies").child($stateParams.USERNAME+$stateParams.POST).child($scope.rep.pushKey).on("value", function(snapRepNum){
                  snapRepNum.forEach(function(snapRepNumChild){
                        if(typeof snapRepNumChild.val() == 'object') {
                              for(var i in snapRepNumChild.val())
                                  $scope.avatars.push(snapRepNumChild.val()[i].Avatar);
                        }
                  })
              })
          }
})(angular);
