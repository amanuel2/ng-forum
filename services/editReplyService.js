(function(){
    var app = angular.module('ForumApp')
    
    app.service('editReplyService', [editReplyService])
    
    function editReplyService(){
        this.topicCreatorName = null;
        this.nonParsedDate = null;
        this.topicCreatorUID = null;
        this.pushK = null;
        
        this.setInfo = function(push,name,date,uid){
            this.topicCreatorName = name;
            this.nonParsedDate = date;
            this.topicCreatorUID = uid;
            this.pushK = push;
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
        this.getPushK = function(){
            return (this.pushK);
        }
    }
})(angular);