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
        this.getEmojies = function(){
            return({
            ':)': '<img src="assets/emoji/emoji-E056.png"/>',
            ':smile:': '<img src="assets/emoji/emoji-E056.png"/>',
            ':(': '<img src="assets/emoji/emoji-E058.png"/> ',
            ':sad:': '<img src="assets/emoji/emoji-E058.png"/> ',
            ':D': '<img src="assets/emoji/emoji-E415.png"/> ',
            ':smiley:': '<img src="assets/emoji/emoji-E415.png"/> ',
            ':;': '<img src="assets/emoji/emoji-E057.png"/> ',
            ':very_happy:': '<img src="assets/emoji/emoji-E057.png"/> ',
            ':P': '<img src="assets/emoji/emoji-E105.png"/> ',
            ':tounge_stuck_out:': '<img src="assets/emoji/emoji-E105.png"/> ',
            ':X': '<img src="assets/emoji/emoji-E40C.png"/>',
            ':cant_talk:': '<img src="assets/emoji/emoji-E40C.png"/>',
            'xD': '<img src="assets/emoji/emoji-E770.png"/>',
            ':laugh_dang:' : '<img src="assets/emoji/emoji-E770.png"/>',
            '-1': '<img src="assets/emoji/emoji-E421.png"/>',
            ':minus_one:': '<img src="assets/emoji/emoji-E421.png"/>',
            '+1': '<img src="assets/emoji/emoji-E00E.png"/>',
            ':plus_one:': '<img src="assets/emoji/emoji-E00E.png"/>'
          })
        }
    }
})(angular);