(function(angular){
    var app = angular.module('ForumApp')

    app.service('replyService', [replyService])
    function replyService(){
        this.topicTitle = "";
        this.creatorTitle = "";
        this.creatorUID = ""
        this.creatorUsername = ""
        this.creatorValue = ""
        this.creatorDate = ""
        this.creatorAvatar = "";
        this.creatorEmail = ""
        this.timeSinceCreated = ""
        this.setTopicInfo = function(title,creator,uid,username,value,date,email,since,avatar){
            this.topicTitle = title;
            this.creatorTitle = creator;
            this.creatorUID = uid;
            this.creatorUsername = username;
            this.creatorValue = value;
            this.creatorDate = date;
            this.creatorEmail = email;
            this.timeSinceCreated = since;
            this.creatorAvatar = avatar;
            return title,creator,uid,username,value,date,email,since;
        }
        this.getTopicInfo = function () {
            return this.topicTitle,this.creatorTitle,
                   this.creatorUID,this.creatorUsername,
                   this.creatorValue,this.creatorDate,
                   this.creatorEmail,this.timeSinceCreated
                   this.creatorAvatar;
        }
    }
})(angular);