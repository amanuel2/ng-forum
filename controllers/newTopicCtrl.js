(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('newTopicCtrl', ["$scope", "$mdDialog", "$firebaseArray", "refService", "$firebaseArray", "currentAuth", "$firebaseObject", "$mdBottomSheet", '$http', newTopicCtrl])

    function newTopicCtrl($scope, $mdDialog, $firebaseArray, refService, $firebaseArray, currentAuth, $firebaseObject, $mdBottomSheet, $http) {
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

        //Load Tags If Not Done...
        var defaultTags = ["Assembly", "C", "C++", "Java", "Javascript", "Firebase", "AngularFire", "MongoDB", "NodeJS",
            "Go", "PHP", "MySQL", "Postgree", "Ruby", "Python", "Perl", ".Net", "ASP.Net", "C#", "Visual Basic", "AngularJS", "Materializecss"
        ]

        $scope.isThereTag = false;

        $scope.defaultTags = $firebaseArray(refService.ref().child("Constants").child('Tags').child("Default"));
        $scope.myOptions = [{
            value: '1',
            text: 'Jordy'
        }];


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
        $scope.markdownData = "#Type Your Markrdown Here";

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
                    element.value += '#HeaderHere';
                    break;

                case 'code':
                    element.value += "```\n" + "console.log('Code Here') \n" + "```";
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
                refService.ref().child("UserAuthInfo").child(currentAuth.uid).on("value", function(snapshot) {
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
                        UID: currentAuth.uid,
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