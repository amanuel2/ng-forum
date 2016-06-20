(function(){
    angular
            .module('ForumApp')
            .filter('range', function() {
                return function(input, min, max) {
                    var range = [];
                    min = parseInt(min); //Make string input int
                    max = parseInt(max);
                    for (var i=min; i<=max; i++)
                        input[i] && range.push(input[i]);
                    return range;
                };
            });
})(angular);