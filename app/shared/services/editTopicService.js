(function(angular){
    var app = angular.module('ForumApp');
    
    app.service('editTopicService', [ editTopicFuncService])
    
    function editTopicFuncService(){
        this.dateCreated = null;
        this.setDateCreated = function(value){
            this.dateCreated = value;
        }
        this.getDateCreated = function(){
            return (this.dateCreated);
        }
    }
})(angular);