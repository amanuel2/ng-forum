(function(angular) {
    var app = angular.module('ForumApp')

    app.service('refService', ["$firebaseAuth",refService])
    
    function refService($firebaseAuth){
        this.ref = function() {
            return new Firebase('https://uniquecodersforum.firebaseio.com/');
        }
        this.refAuth = function() {
            return $firebaseAuth(this.ref());
        }
    
    }
})(angular);