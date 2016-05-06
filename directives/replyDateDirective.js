(function(angular){
    var app = angular.module('ForumApp')

    app.directive('replyDateDirective', ["timeService",replyDirective])

    function replyDirective(timeService){
        return {
            restrict:'E',
            transclude:true,
            template : "<span><ng-transclude></ng-transclude></span>",
            link:function(scope, elm, attrs){
                var elemzero = elm[0];
                var dateNotParsed = elm[0].innerText;
                console.log("DATE NOT PARSED" , dateNotParsed)
                var dateParsed = timeService.getTimeF(new Date(parseInt(dateNotParsed)))
                //elemzero.innerText = dateParsed;
            }
        }
    }
})(angular);