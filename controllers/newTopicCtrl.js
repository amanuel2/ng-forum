(function(angular) {
    var app = angular.module('ForumApp')

    app.controller('newTopicCtrl', ["$scope", "$mdDialog", "$firebaseArray", "refService", "currentAuth", "$mdBottomSheet", newTopicCtrl])

    function newTopicCtrl($scope, $mdDialog, $firebaseArray, refService, currentAuth, $mdBottomSheet) {
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
            /*var search = $firebaseArray(refService.ref().child("TopicCount"))
            search.$loaded(function(data) {
                if (!data[0].$value) {
                    refService.ref().child("TopicCount").set({
                        Count: 0
                    })
                    var searchAg = $firebaseArray(refService.ref().child("TopicCount"))
                    searchAg.$loaded(function(nestedData) {
                        nestedData[0].$value = nestedData[0].$value + 1;
                        refService.ref().child("TopicCount").set({
                            Count: nestedData[0].$value + 1
                        })
                    })
                }
                data[0].$value = data[0].$value + 1;
                refService.ref().child("TopicCount").set({
                    Count: data[0].$value + 1
                })
                
                $scope.VALUECOUNT = data[0].$value + 1
            })*/

        $scope.submitNewTopic = function() {

            var search = $firebaseArray(refService.ref().child("Topics"))
            search.$loaded(function(data) {
                refService.ref().child("UserAuthInfo").child(currentAuth.uid).on("value", function(snapshot) {
                    $scope.userAvatar = snapshot.val().Image;
                    $scope.userName = snapshot.val().Username;
                    $scope.userEmail = snapshot.val().Email;

                    var pushing = refService.ref().child("Topics").push({
                        Title: $scope.topic.title,
                        Value: $scope.topic.sentence,
                        DateCreated: Date.now(),
                        Username: $scope.userName,
                        Email: $scope.userEmail,
                        Avatar: $scope.userAvatar,
                        UID: currentAuth.uid,
                        Postnum: data.length,
                        Votes: 0
                    })

                    refService.ref().child("Topics").child(pushing.key()).update({
                        pushKey: pushing.key()
                    })
            $scope.topic.sentence = "";
            $scope.topic.title = "";
                })
            })


            $mdBottomSheet.cancel();

        }

    }
})(angular);