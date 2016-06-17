(function(){
    'use strict';
    
    angular
           .module('ForumApp')
           .controller('emojieToolCtrl', ["$scope","emojieTool","$mdDialog","$rootScope", emojieToolCtrlfunc])
           
           function emojieToolCtrlfunc($scope,emojieTool,$mdDialog,$rootScope) {
                $scope.emojieListCtrl = [
                    {name : ':smile:', img: '<img src="assets/emoji/emoji-E056.png"/>'},
                    {name : ':sad:' , img: '<img src="assets/emoji/emoji-E058.png"/> '},
                    {name : ':smiley:', img: '<img src="assets/emoji/emoji-E415.png"/> '},
                    {name : ':very_happy:', img: '<img src="assets/emoji/emoji-E057.png"/>'},
                    {name : ':tounge_stuck_out:', img: '<img src="assets/emoji/emoji-E105.png"/> '},
                    {name : ':cant_talk:', img:'<img src="assets/emoji/emoji-E40C.png"/>'},
                    {name : ':laugh_dang:' ,img: '<img src="assets/emoji/emoji-E770.png"/>'},
                    {name : ':minus_one:',img: '<img src="assets/emoji/emoji-E421.png"/>'},
                    {name : ':plus_one:',img: '<img src="assets/emoji/emoji-E00E.png"/>'},
                  ]
                   $scope.hide = function() {
                        $mdDialog.hide();
                        $rootScope.markdownData= '# HELLO CHANGED'
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                        $rootScope.markdownData= '# HELLO CHANGED'
                    };
                    $scope.answer = function(answer) {
                        $mdDialog.hide(answer);
                    };
                    
              var emojieTool = emojieTool.getElementInfo();
             
           }
})(angular);