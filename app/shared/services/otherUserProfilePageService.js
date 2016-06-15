(function(){
    var app = angular.module('ForumApp')
    
    app.service('otherUserProfilePageService', [otherUserProfilePageServicefunc])
    
    function otherUserProfilePageServicefunc(){
        this.otherUserID = ''
        
        this.setID = function(ID){
            this.otherUserID = ID;
        }
        
        this.getID = function(){
            return (this.otherUserID);
        }
    }
})(angular);