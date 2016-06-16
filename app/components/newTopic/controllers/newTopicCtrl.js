(function(angular) {
    'use struct';
  angular
    .module('ForumApp')
    .controller('newTopicCtrl', ["$scope", "$mdDialog", "$firebaseArray","emojiListService", "refService", "$firebaseArray", "$firebaseObject", "$mdBottomSheet", '$http', newTopicCtrl])


 
  
    function newTopicCtrl($scope, $mdDialog, $firebaseArray,emojiListService, refService, $firebaseArray, $firebaseObject, $mdBottomSheet, $http) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.logicToGoBack = function() {
            $mdBottomSheet.cancel()
        }
        String.prototype.replaceAt=function(index, character) {
            return this.substr(0, index) + character + this.substr(index+character.length);
        }
        String.prototype.replaceAll = function(str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
        } 
        $scope.currentAuthGet = refService.ref().getAuth();
         marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false, 
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
              if (lang) {
                return hljs.highlight(lang, code).value;
              } else {
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
        $scope.$watch('markdownData', function(current, original) {
          $scope.outputText = marked(current);
          //EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
          for(var prop in $scope.emojieList)
              $scope.outputText = $scope.outputText.replaceAll(prop, $scope.emojieList[prop]); 
        });
        //Load Tags If Not Done...
        var defaultTags = ["Assembly", "C", "C++", "Java", "Javascript", "Firebase", "AngularFire", "MongoDB", "NodeJS",
            "Go", "PHP", "MySQL", "Postgree", "Ruby", "Python", "Perl", ".Net", "ASP.Net", "C#", "Visual Basic", "VB.net","AngularJS", "Materializecss"
        ]

        $scope.isThereTag = false;

        $scope.defaultTags = $firebaseArray(refService.ref().child("Constants").child('Tags').child("Default"));
        

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


        $scope.tagCheckPrev = $firebaseObject(refService.ref().child("Constants").child("Tags"));

        $scope.tagCheckPrev.$loaded(function(dataC) {
            if (dataC.Default) {
                console.log("Default Already Loaded")
            }
            else {
                for (var i = 0; i < defaultTags.length; i++) {
                    refService.ref().child("Constants").child("Tags").child("Default").push({
                        ID: i,
                        Name: defaultTags[i]
                    })
                }
            }
        })


        $scope.undoAndRedo = function(ev, opt) {
            if (opt == 'undo') {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Undo')
                    .textContent('Just Click Ctrl + Z Simultaneously to Undo Your Changes')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            }

            else {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Redo')
                    .textContent('Just Click Ctrl + Y Simultaneously to Redo Your Changes')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            }
        }

        angular.element(document).ready(function() {
            new Clipboard('.btn');
        })
        $scope.markdownData = "# Type Your Markrdown Here";

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
                    element.value += "\n\n ----"
                    break;

                case 'paste':
                    if (window.clipboardData) {
                        element.value += window.clipboardData.getData("Text");
                    }
                    else {
                        alertify.error(window.clipboardData.getData('Text'));
                    }

                case 'help':
                    window.open('https://simplemde.com/markdown-guide');
                    break;

            }
        }
        $scope.submitNewTopic = function() {
            var indexSelected = $scope.tagsSelected;
            $scope.tagsSelectedFireBase = [];
            //$scope.defaultTags
            for (var i = 0; i < indexSelected.length; i++) {
                $scope.tagsSelectedFireBase.push($scope.defaultTags[indexSelected[i]].Name)
            }

            var search = $firebaseArray(refService.ref().child("Topics"))
            search.$loaded(function(data) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGet.uid).on("value", function(snapshot) {
                    $scope.userAvatar = snapshot.val().Image;
                    $scope.userName = snapshot.val().Username;
                    $scope.userEmail = snapshot.val().Email;

                    var pushing = refService.ref().child("Topics").push({
                        Title: $scope.topic.title,
                        Value: $scope.markdownData,
                        DateCreated: Date.now(),
                        LastActivity : Date.now(),
                        Username: $scope.userName,
                        Email: $scope.userEmail,
                        Avatar: $scope.userAvatar,
                        UID: $scope.currentAuthGet.uid,
                        Tags: $scope.tagsSelectedFireBase,
                        Postnum: data.length,
                        IsAcceptedAnwser: false,
                        Votes: 0,
                        AcceptedAnwserReplyNum: -1
                    })

                    refService.ref().child("Topics").child(pushing.key()).update({
                        pushKey: pushing.key()
                    })
                    $mdBottomSheet.cancel();
                    $scope.topic.sentence = "";
                    $scope.topic.title = "";
                })
            })


        }




    }
})(angular);