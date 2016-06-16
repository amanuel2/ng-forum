(function(angular) {
    var app = angular.module('ForumApp')

    app.service('refService', ["$firebaseAuth",refService])
    
    function refService($firebaseAuth){
        this.ref = function() {
<<<<<<< HEAD:app/shared/services/refService.js
            return new Firebase('https://uniquecodersforums.firebaseio.com/');
=======
            return new Firebase('https://uniquecoders.firebaseio.com/');
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:services/refService.js
        }
        this.refAuth = function() {
            return $firebaseAuth(this.ref());
        }
    
    }
})(angular);