(function(angular) {
    'use strict';

    angular
        .module('ForumApp')
        .controller('editTopicPanelCtrl', ['$scope', 'emojiListService', 'refService', '$firebaseObject', '$stateParams', '$firebaseArray', '$mdDialog', '$mdMedia', editTopicPanelCtrlfunc]);

    function editTopicPanelCtrlfunc($scope, emojiListService, refService, $firebaseObject, $stateParams, $firebaseArray, $mdDialog, $mdMedia) {
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
                    values: $scope.dataTrib,
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
                values: ($scope.dataTribHash),
                selectTemplate: function(item) {
                    return (item.original.value).replace("@", "");
                },
            })
            angular.element(document).ready(function() {
                setTimeout(function() {
                    tribute_hash.attach(document.getElementById('markdownUserType'));
                }, 500)
            })
        })


        $scope.cancel = function() {
            $mdDialog.cancel();
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

        $scope.emojieList = emojiListService.getEmojies();


        $scope.outputTextFirebaseObject = $firebaseObject(refService.ref().child("Topics"))
        $scope.defaultTags = $firebaseArray(refService.ref().child("Constants").child('Tags').child("Default"));
        $scope.outputTextFirebaseObject.$loaded(function(daDATA) {
            for (var prop in daDATA) {
                if (daDATA[prop] !== null) {
                    if (daDATA[prop].Postnum == $stateParams.POST) {
                        refService.ref().child("Topics").child(daDATA[prop].pushKey).once("value", function(daDATASNAP) {
                            $scope.editTitle = daDATASNAP.val().Title
                            $scope.editValue = daDATASNAP.val().Value;
                        })

                    }
                }
            }
        })
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

            $scope.outputText = marked(current);
            //EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
            for (var prop in $scope.emojieList)
                $scope.outputText = $scope.outputText.replaceAll(prop, $scope.emojieList[prop]);
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

                case 'emojies':
                    window.open('https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions');

            }
        }
        $scope.editTopicPan = function() {
            var indexSelected = $scope.tagsSelected;
            $scope.tagsSelectedFireBase = [];
            //$scope.defaultTags
            for (var i = 0; i < indexSelected.length; i++) {
                $scope.tagsSelectedFireBase.push($scope.defaultTags[indexSelected[i]].Name)
            }
            $scope.editTextStuff = $firebaseObject(refService.ref().child("Topics"))
            $scope.editTextStuff.$loaded(function(daDATA) {
                for (var prop in daDATA) {
                    if (daDATA[prop] !== null) {
                        if (daDATA[prop].Postnum == $stateParams.POST) {
                            refService.ref().child("Topics").child(daDATA[prop].pushKey).update({
                                Value: $scope.editValue,
                                Title: $scope.editTitle,
                                Tags: $scope.tagsSelectedFireBase
                            })
                        }
                    }
                }
                $mdDialog.cancel();
            })

        }
    }

})(angular);