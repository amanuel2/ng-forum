(function(){
    var app = angular.module('ForumApp')
    
    app.service('editReplyService', [editReplyService])
    
    function editReplyService(){
        this.topicCreatorName = null;
        this.nonParsedDate = null;
        this.topicCreatorUID = null;
        
        this.setInfo = function(name,date,uid){
            this.topicCreatorName = name;
            this.nonParsedDate = date;
            this.topicCreatorUID = uid;
        }
        this.getName = function(){
            return (this.topicCreatorName);
        }
        
        this.getDatee = function(){
            return (this.nonParsedDate);
        }
        
        this.getTopicUID = function(){
            return (this.topicCreatorUID);
        }
    }
})(angular);