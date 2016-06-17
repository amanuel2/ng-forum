(function(angular) {
'use strict';
    angular
        .module('ForumApp')
        .controller('newReplyCtrl', ["$scope","emojiListService", "$firebaseObject", "$mdDialog", "refService","$mdMedia", "currentAuth", "replyService", "timeService", "$stateParams", "$firebaseArray", newReplyCtrl])

    function newReplyCtrl($scope,emojiListService, $firebaseObject, $mdDialog, refService, $mdMedia,currentAuth, replyService, timeService, $stateParams, $firebaseArray) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        
        String.prototype.replaceAll = function(str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
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
            highlight: function (code, lang) {
              if (lang) {
                return hljs.highlight(lang, code).value;
              } else {
                return hljs.highlightAuto(code).value;
              }
            }
          });
          
         $scope.emojieList = emojiListService.getEmojies();
        $scope.$watch('markdownData', function(current, original) {
          if(current)
                $scope.outputText = marked(current);
          //EMOJIE LIST {PARAM} {https://github.com/amanuel2/ng-forum/wiki/How-to-write-emotions}
          if($scope.outputText) {
              for(var prop in $scope.emojieList)
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

            }
        }
        
        
         $scope.emojieStart = function(ev) {
             if (ev) {
                 var element = document.getElementById('markdownUserType');
                //emojieTool.setElementInfo(element);
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
        
        $scope.emojieFunc = function () {
            console.log("DS")
        }

        $scope.submitNewReply = function() {
            $scope.currentAuthGet = refService.ref().getAuth();

            $scope.numRepliesAlready = $firebaseArray(refService.ref().child("Replies").child($stateParams.USERNAME + $stateParams.POST))

            $scope.numRepliesAlready.$loaded(function(data) {
                refService.ref().child("UserAuthInfo").child($scope.currentAuthGet.uid).on("value", function(snapshot) {
                    $scope.userAvatar = snapshot.val().Image;
                    $scope.userName = snapshot.val().Username;
                    $scope.userEmail = snapshot.val().Email;

                })
                var pushingR = refService.ref().child("Replies").child(replyService.creatorUsername + replyService.postNum).push({
                    replyCreatorUsername: $scope.userName,
                    replyCreatorAvatar: $scope.userAvatar,
                    replyCreatorEmail: $scope.userEmail,
                    replyCreatorUID: $scope.currentAuthGet.uid,
                    replyCreatorValue: $scope.markdownData,
                    replyCreatorDate: Date.now(),
                    Replynum: data.length,
                    replyCreatorDateParsed: timeService.getTimeF(new Date(parseInt(Date.now()))),
                    topicCreatorUsername: replyService.creatorUsername,
                    topicCreatorUID: replyService.creatorUID,
                    topicCreatorTitle: replyService.creatorTitle,
                    topicCreatorAvatar: replyService.creatorAvatar,
                    topicCreatorSince: replyService.timeSinceCreated

                })
                refService.ref().child("Replies").child(replyService.creatorUsername + replyService.postNum).child(pushingR.key()).update({
                    pushKey: pushingR.key()
                })

                $scope.lastAct = $firebaseObject(refService.ref().child("Topics"));
                $scope.lastAct.$loaded(function(dataLast) {
                    dataLast.forEach(function(snapDataLastAct) {
                        if (snapDataLastAct.Postnum == $stateParams.POST) {
                            refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                LastActivity: Date.now(),
                            })
                            refService.ref().child("Topics").child(snapDataLastAct.pushKey).once("value", function(snapREPVIEWS) {
                                if (!snapREPVIEWS.val().RepliesNum) {
                                    console.log(snapREPVIEWS)
                                    refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                        RepliesNum: (1)
                                    })
                                } else {
                                    refService.ref().child("Topics").child(snapDataLastAct.pushKey).update({
                                        RepliesNum: (snapREPVIEWS.val().RepliesNum + 1)
                                    })
                                }


                            })
                        }
                    })
                })
                $scope.markdownData = '';
                $mdDialog.cancel();


            })

        }

    }
})(angular);