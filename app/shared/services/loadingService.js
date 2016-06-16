(function(angular){
    var app = angular.module('ForumApp')
    
    app.service('loadingService', [loadingServiceFunc])
    
    function loadingServiceFunc() {
        this.loadingTo = null;
        this.setLoadingTo = function(value) {
            this.loadingTo = value;
        }
        this.getLoadingTo = function() {
            return (this.loadingTo);
        }
    }
})(angular);