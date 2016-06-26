(function() {
    'use strict';
    angular
        .module('ForumApp')
        .filter('tagsMultiple', function() {
            return function(input) {
                String.prototype.replaceAll = function(str1, str2, ignore) {
                    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
                }
                return ((JSON.stringify(input)).replaceAll('[', '').replaceAll('"', '').replaceAll(']', ''))
            };
        });
})(angular);