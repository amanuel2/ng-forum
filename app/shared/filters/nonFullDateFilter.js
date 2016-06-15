(function(angular){
    var app = angular.module('ForumApp');

    app.filter("nonFullDateFilter", ["timeService",nonFullDateFilterFunc]);

    function nonFullDateFilterFunc(timeService){
        return function(input){
            return (((JSON.stringify((new Date(parseInt(input))))).replace('"','')).substring(0,10))
        }
    }
})(angular);