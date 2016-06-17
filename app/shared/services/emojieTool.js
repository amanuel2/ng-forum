(function(){
    angular 
           .module('ForumApp')
           .service('emojieTool', [emojieToolfunc])
           
           function emojieToolfunc() {
                   this.elementInfo = null;
                   this.setElementInfo = function(elem){
                       this.elementInfo = elem;
                   }
                   this.getElementInfo = function(){
                       return(this.elementInfo);
                   }
                   this.resetElementInfo = function(){
                       this.elementInfo = null;
                   }
           }
})(angular);