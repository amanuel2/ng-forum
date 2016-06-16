(function(angular) {
'use strict';
    angular
        .module('ForumApp')
        .controller('newReplyCtrl', ["$scope", "$firebaseObject", "$mdDialog", "refService", "currentAuth", "replyService", "timeService", "$stateParams", "$firebaseArray", newReplyCtrl])

    function newReplyCtrl($scope, $firebaseObject, $mdDialog, refService, currentAuth, replyService, timeService, $stateParams, $firebaseArray) {
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