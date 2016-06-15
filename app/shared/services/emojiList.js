(function(angular){
    var app = angular.module('ForumApp');
    
    app.service('emojiListService', [emojiListFunc]);
    
    function emojiListFunc(){
        String.prototype.replaceAt=function(index, character) {
            return this.substr(0, index) + character + this.substr(index+character.length);
        }
        String.prototype.replaceAll = function(str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
        } 
        this.currentRenderEmojies = function(valRend) {
             valRend = valRend.replaceAll(':)', 'views/assets/emoji/emoji-E056.png');
        }
    }
})(angular);