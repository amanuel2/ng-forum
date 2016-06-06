(function(angular) {
    var app = angular.module('ForumApp');

    app.controller('authDescCtrl', ["$scope", "dateFilter", "$mdDialog", "$state", "$mdMedia", "$mdEditDialog", "$mdBottomSheet", "$firebaseObject", "refService", "$timeout", "$firebaseArray", authDescCtrl])

    function authDescCtrl($scope, dateFilter, $mdDialog, $state, $mdMedia, $mdEditDialog, $mdBottomSheet, $firebaseObject, refService, $timeout, $firebaseArray) {

        $scope.authDataDesc = refService.ref().getAuth();

        $scope.topic = $firebaseObject(refService.ref().child("Topics"))
        $scope.topicName = $firebaseArray(refService.ref().child("Topics"))
        $scope.topicViewsLen = [];

        //Setting Views
        $scope.topicName.$loaded(function(data) {
            data.forEach(function(dataChild) {
                var x = dataChild.Views;
                var len = 0;
                for (var i in dataChild.Views) {
                    len++;
                }
                $scope.topicViewsLen.push(len);
            })
            var times = 0;
            data.forEach(function(dataChild) {
                refService.ref().child("Topics").child(dataChild.pushKey).update({
                    ViewsLen: $scope.topicViewsLen[times]
                })
                times++;
            })
        })
        

        $scope.loadUsers = function(topic) {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {
                $scope.tagsOption = topic.Tags;
            }, 650);
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];

        $scope.editComment = function(event, topic) {
            event.stopPropagation(); // in case autoselect is enabled

            var editDialog = {
                modelValue: topic.Comment,
                placeholder: 'Add a Comment',
                save: function(input) {
                    if (input.$modelValue === 'Donald Trump') {
                        input.$invalid = true;
                        return $q.reject();
                    }
                    if (input.$modelValue === 'Bernie Sanders') {
                        return topic.Comment = 'FEEL THE BERN!'
                    }
                    topic.Comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Add a Comment',
                validators: {
                    'md-maxlength': 30
                }
            };

            var promise;

            if (true) {
                promise = $mdEditDialog.large(editDialog);
            } else {
                promise = $mdEditDialog.small(editDialog);
            }

            promise.then(function(ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function() {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

        $scope.goToPerson = function(person, event) {
            $mdDialog.show(
                $mdDialog.alert()
                .title('Navigating')
                .textContent('Inspect ' + person)
                .ariaLabel('Person inspect demo')
                .ok('Neat!')
                .targetEvent(event)
            );
        };

        $scope.loadStuff = function() {
            $scope.promise = $timeout(function() {
                // loading
            }, 2000);
        }



        $scope.showNewTopic = function(ev) {
            if (ev) {


                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdBottomSheet.show({
                    controller: 'newTopicCtrl',
                    templateUrl: 'views/newTopic.html',
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
                }).then(function(clickedItem) {
                    $scope.alert = clickedItem['name'] + ' clicked!';
                });

            } else {


            }
        }

        $scope.goToTOPICAUTCOMPLETE = function(info) {
            $state.go("authHome.topic", {
                "USERNAME": info.Username,
                "POST": info.Postnum
            })
        }
        $scope.goToTopic = function(avatar, date, email, title, uid, username, value, postnum) {
            $state.go("authHome.topic", {
                "USERNAME": username,
                "POST": postnum
            })

        }


    }
})(angular);