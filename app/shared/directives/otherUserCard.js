(function(angular) {
   'use strict'; 
     angular
     .module('ForumApp')
     .directive('otherUserCard', otherUserCard)

    function otherUserCard() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                name: '@',
                theme: '@',
                image : '@',
                Moderator : '@',
                desc:'@'
            },
            templateUrl: 'views/directiveViews/otherUserCard.html',
            link: function(scope, elem, attrs, ctrl) {

            },
            controller: function($scope) {
                $scope.theme = $scope.theme || 'default'
            }
        }
    }
})(angular);