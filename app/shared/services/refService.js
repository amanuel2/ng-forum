(function(angular) {
    var app = angular.module('ForumApp')

    app.service('refService', ["$firebaseAuth", refService])
    
    function refService($firebaseAuth){
        this.ref = function() {
            return new Firebase('https://uniquecoders.firebaseio.com/');
        }
        this.refAuth = function() {
            return $firebaseAuth(this.ref());
        }
    
    }
})(angular);
