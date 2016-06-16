(function(){
    'use strict';
    
        angular
               .module('ForumApp')
               .service('topicLikesService', [topicLikesServiceFunc])
               
               function topicLikesServiceFunc(){
                   this.info = [];
                   
                   this.setInfo = function(info1, info2){
                       this.info.push(info1);
                       this.info.push(info2);
                   }
                   
                   this.resetInfo = function(){
                       this.info = [];
                   }
                   
                   this.getInfo = function() {
                       return (this.info);
                   }
                   
                   this.getInfo1 = function(){
                     return (this.info[0]);   
                   }
                   this.getInfo2 = function(){
                     return (this.info[1]);   
                   }
               }
})(angular);