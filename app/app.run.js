<<<<<<< HEAD:app/app.run.js
angular.module('ForumApp')
  .run(function($rootScope, $location, $state) {
=======
(function(angular){
    var app = angular.module('ForumApp');
    
      app.run(["$rootScope", "$location","$state", function($rootScope, $location,$state) {
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:run/authCheck.js
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("home");
      }
    });
  });
