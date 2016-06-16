(function(angular) {
    var app = angular.module('ForumApp')

    app.service('otherUserService', [refService])
    
    function refService(){
        this.otherUserInfo = null;
        this.otherACTUALINFO = null;
        this.setUserInfo = function(info){
            this.otherUserInfo = info;
        }
        this.getUserInfo = function(){
            return (this.otherUserInfo);
        }
        this.ACTUALsetUserInfo = function(info){
            this.otherACTUALINFO = info;
        }
        this.ACTUALgetUserInfo = function(){
            return (this.otherACTUALINFO);
        }
    }
})(angular);