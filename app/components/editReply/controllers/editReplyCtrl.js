(function(angular){
    
    'use strict';
    
    angular
            .module('ForumApp')
            .controller('editReplyCtrl', ["$scope","$mdDialog","currentAuth","refService","editTopicService","editReplyService","$mdMedia", editReplyFunc])
    
    function editReplyFunc($scope,$mdDialog,currentAuth,refService,editTopicService,editReplyService,$mdMedia){
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        String.prototype.replaceAt = function(index, character) {
            return this.substr(0, index) + character + this.substr(index + character.length);
        }
        String.prototype.replaceAll = function(str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        }
        
         marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function(code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code).value;
                }
                else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });

        $scope.emojieList = {
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
        }
         $scope.myConfig = {
            create: true,
            onChange: function(value) {
                console.log('onChange', value)
            },
            valueField: 'ID',
            labelField: 'Name',
            maxItems: 5,
            required: true,
        }

        $scope.$watch('editValue', function(current, original) {
            if(current)
                $scope.outputText = marked(current);
            //EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
            if($scope.outputText) {
                for (var prop in $scope.emojieList)
                    $scope.outputText = $scope.outputText.replaceAll(prop, $scope.emojieList[prop]);
            }
        });
        
          $scope.shortcuts = function(shortcutName) {
            var element = document.getElementById('markdownUserType');
            switch (shortcutName) {
                case 'bold':
                    element.value += '**BoldTextHere**';
                    break;
                case 'italics':
                    element.value += '_ItalicTextHere_';
                    break;

                case 'image':
                    element.value += '![](http://)';
                    break;

                case 'url':
                    element.value += '[](http://)';
                    break;

                case 'quote':
                    element.value += '> Quote Here';
                    break;

                case 'number':
                    element.value += '\n\n 1. List item'
                    break;

                case 'bullet':
                    element.value += '\n\n * List item'
                    break;
                case 'header':
                    element.value += '# Header Here.';
                    break;

                case 'code':
                    element.value += "```[languageName. If you dont know delete this bracket and leave it with three ticks]\n" + "console.log('Code Here') \n" + "```";
                    break;

                case 'horizontal':
                    element.value += "\n\n -----"
                    break;

                case 'paste':
                    if (window.clipboardData) {
                        element.value += window.clipboardData.getData("Text");
                    }
                    else {
                        alertify.error(window.clipboardData.getData('Text'));
                    }
                    
                case 'emojies':
                     
                case 'help':
                    window.open('https://simplemde.com/markdown-guide');
                    break;
                
                case 'emojies':
                    window.open('https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions');    

            }
        }
        
    $scope.editREPLY = function(){
            var topicPushKey = editReplyService.getPushK();
            var POST = editReplyService.getDatee();
            var USERNAME = editReplyService.getName();
            var UIDUSERNAME = editReplyService.getTopicUID();
            
            
            refService.ref().child("Replies").child(USERNAME+POST).on("value", function(snapshot){
                snapshot.forEach(function(childSnap){
                    var key = childSnap.key();
                    var childData = childSnap.val();
                    if(childData.pushKey == topicPushKey){
                        refService.ref().child("Replies").child(USERNAME+POST).child(childData.pushKey).update({
                            replyCreatorValue : $scope.editValue
                        })
                    }
                })
            })
            
        }

    }
    
})(angular);