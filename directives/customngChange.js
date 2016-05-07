(function(angular){
    var app = angular.module('ForumApp')
    
    app.directive('customOnChange', customOnChange);

    function customOnChange(){
        return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var onChangeHandler = scope.$eval(attrs.customOnChange);
          element.bind('change', onChangeHandler);
        }
      };
    }
})(angular);
