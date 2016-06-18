(function(angular) {
    'use struct';
    angular
        .module('ForumApp')
        .controller('newTopicCtrl', ["$scope", "$mdDialog", "emojiListService", "$firebaseArray", "emojieTool", "$mdMedia", "emojiListService", "refService", "$firebaseArray", "$firebaseObject", "$mdBottomSheet", '$http', newTopicCtrl])


    function newTopicCtrl($scope, $mdDialog, emojiListService, $firebaseArray, emojieTool, $mdMedia, emojiListService, refService, $firebaseArray, $firebaseObject, $mdBottomSheet, $http) {


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
        String.prototype.replaceAt = function(index, character) {
            return this.substr(0, index) + character + this.substr(index + character.length);
        }
        String.prototype.replaceAll = function(str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        }
        var elem_hash = '';
        $scope.dataTrib = [];
        $scope.dataTribHash = [];
        refService.ref().child("UserAuthInfo").once("value", function(snapUser) {
            snapUser.forEach(function(snapUserEach) {
                var key = snapUserEach.key();
                var val = snapUserEach.val();
                $scope.dataTrib.push({
                    key: '<img src="' + val.Image + '" width="30px" height="30px"/> ' + val.Username,
                    value: val.Username
                })
                var tribute = new Tribute({
                    trigger: '@',
                    values: $scope.dataTrib
                })
                angular.element(document).ready(function() {
                    tribute.attach(document.getElementById('markdownUserType'));
                })

            })
        })

        refService.ref().child("Topics").once("value", function(snapTopic) {
            snapTopic.forEach(function(snapTopicEven) {
                var key = snapTopicEven.key();
                var val = snapTopicEven.val();
                 $scope.dataTribHash.push({
                    key: "#" + val.Postnum + ":" + val.Title,
                    value: "#" + (val.Postnum)
                })
            })
             var tribute_hash = new Tribute({
                    trigger: '#',
                    values: ($scope.dataTribHash)
                })
                angular.element(document).ready(function() {
                    setTimeout(function() {
                        tribute_hash.attach(document.getElementById('markdownUserType'));
                    }, 500)
                })
        })



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
            highlight: function(code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code).value;
                }
                else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });

        if (emojieTool.getElementInfo() !== null) {
            console.log(emojieTool.getElementInfo())
        }

        $scope.emojieList = emojiListService.getEmojies();
        $scope.$watch('markdownData', function(current, original) {
            $scope.outputText = marked(current);
            //EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
            for (var prop in $scope.emojieList)
                $scope.outputText = $scope.outputText.replaceAll(prop, $scope.emojieList[prop]);
        });
        //Load Tags If Not Done...
        var defaultTags = ["Assembly", "C", "C++", "Java", "Javascript", "Firebase", "AngularFire", "MongoDB", "NodeJS",
            "Go", "PHP", "MySQL", "Postgree", "Ruby", "Python", "Perl", ".Net", "ASP.Net", "C#", "Visual Basic", "VB.net", "AngularJS", "Materializecss"
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

            }
        }

        $scope.emojieStart = function(ev) {
            if (ev) {
                var element = document.getElementById('markdownUserType');
                emojieTool.setElementInfo(element);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        controller: 'emojieToolCtrl',
                        templateUrl: 'app/components/emojieTool/emojieTool.html',
                        parent: angular.element(document.body),
                        resolve: {
                            // controller will not be loaded until $waitForAuth resolves
                            // Auth refers to our $firebaseAuth wrapper in the example above
                            "currentAuth": ["refService", function(refService) {
                                // $waitForAuth returns a promise so the resolve waits for it to complete
                                return refService.refAuth().$requireAuth();
                            }]
                        },
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                    .then(function(answer) {
                        //Then Argument
                    }, function() {
                        //Canceled Dialog
                    });
            }
            else {
                return null;
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
                        LastActivity: Date.now(),
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