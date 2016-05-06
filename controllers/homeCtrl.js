(function(angular) {

    var app = angular.module('ForumApp');

    app.controller('homeCtrl', ["$scope", "$state","refService","authCheckTrueService", homeCtrl])
    
    function homeCtrl($scope, $state,refService,authCheckTrueService){
         //var checkAuth = refService.ref().getAuth() ? $state.go("authHome.desc") : console.log("Not Logged In");
        authCheckTrueService.checkAuth(refService.ref(), "authHome.desc");
    }

})(angular);