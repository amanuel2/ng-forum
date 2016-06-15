(function(angular){
    'use strict';
    
    var app = angular.module('ForumApp')
    
    app.service('replaceService', [replaceServicefunc])
    
    function replaceServicefunc(){
        this.replaceAllString = function(str1, str2, ignore) {
                 return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
            } 
    }
})(angular);