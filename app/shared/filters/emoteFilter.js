(function(angular) {
    'use strict';

    angular
        .module('ForumApp')
        .filter('emoteFilter', ['$sce', emoteFilterfunc]);

    function emoteFilterfunc($sce) {
//EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
        function replace(string, str1, str2) {
            return string.replace(
                new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), 'g'),
                str2
            );
        }
        
        function replaceAt(index,character){
            return this.substr(0, index) 
                                + character 
                                + this.substr(
                                                index + character.length
                                             );
        }

        var emojieList = {
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
            //No :text: for this Begin
            'xD': '<img src="assets/emoji/emoji-E770.png"/>',
            //Done
            '-1': '<img src="assets/emoji/emoji-E421.png"/>',
            ':minus_one:': '<img src="assets/emoji/emoji-E421.png"/>',
            '+1': '<img src="assets/emoji/emoji-E00E.png"/>',
            ':plus_one:': '<img src="assets/emoji/emoji-E00E.png"/>'
        };

        return function(string) {

            if (typeof string === 'string') {

                string = marked(string);

                for (var emoji in emojieList) {
                    if (emojieList.hasOwnProperty(emoji)) {
                        string = replace(string, emoji, emojieList[emoji]);
                    }
                }

                return $sce.trustAsHtml(string);
            }

        };
    }
})(angular);