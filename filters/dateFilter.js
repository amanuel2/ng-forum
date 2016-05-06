(function(angular){
    var app = angular.module('ForumApp');

    app.filter("dateFilter", ["timeService",dateFilter]);

    function dateFilter(timeService){
        return function(input){
            return timeService.getTimeF(new Date(parseInt(input)));
        }
    }
})(angular);