(function(angular){
    var app = angular.module('ForumApp')
    
    app.service('authCheckTrueService', ["$state" , authCheckService]);
    
    function authCheckService($state){
        this.checkAuth = function(refService,dest){
            if(refService.getAuth())
                $state.go(dest);
            else
                return null;
            
        }
    }
})(angular);