(function(angular) {
    var app = angular.module('ForumApp')

    app.directive('userCardDirective', userCardDirective)

    function userCardDirective() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                name: '@',
                theme: '@',
                image : '@',
                uid : '@',
                email:'@',
                desc:'@'
            },
            templateUrl: 'views/directiveViews/userCard.html',
            link: function(scope, elem, attrs, ctrl) {

            },
            controller: function($scope) {
                $scope.theme = $scope.theme || 'default'
            }
        }
    }
})(angular);