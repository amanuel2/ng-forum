(function(angular) {
    'use strict';

    angular
        .module('ForumApp')
        .filter('emoteFilter', ['$sce','emojiListService', emoteFilterfunc]);

    function emoteFilterfunc($sce,emojiListService) {
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

        var emojieList = emojiListService.getEmojies();

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