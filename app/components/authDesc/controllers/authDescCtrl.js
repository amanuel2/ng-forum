(function(angular) {
    
    'use strict';
    
    angular
           .module('ForumApp')
           .controller('authDescCtrl', ["$scope", "dateFilter", "$mdDialog", "$state", "$mdMedia", "$mdBottomSheet", "$firebaseObject", "refService", "$timeout", "$firebaseArray", authDescCtrl])

    function authDescCtrl($scope, dateFilter, $mdDialog, $state, $mdMedia, $mdBottomSheet, $firebaseObject, refService, $timeout, $firebaseArray) {

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
        
       
        
        function bookmarked(rep){
            var returne = "False"
                refService.ref().child("Topics").once("value", function(snapshotBookMarkOutlineTopic) {
                        snapshotBookMarkOutlineTopic.forEach(function(evenChildBook) {
                                var bookkey = evenChildBook.key();
                                var bookchildData = evenChildBook.val();
                                if(bookchildData.Bookmarks) {
                                    if(bookchildData.Bookmarks[$scope.authDataDesc.uid].Bookmark == true)
                                        returne = "True"
                                }
                        })
                })
            return returne;
        }
        
        $scope.bookmarked = function(rep){
            if($scope.authDataDesc == null){
                return false;
            }
            else{
                if(bookmarked(rep) == "True")
                    return true;
                else
                    return false;
            }
        }

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
        
         $scope.loadUsers = function(topic) {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {
                $scope.tagsOption = topic.Tags;
            }, 650);
        };



        $scope.showNewTopic = function(ev) {
            if (ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdBottomSheet.show({
                    controller: 'newTopicCtrl',
                    templateUrl: 'app/components/newTopic/newTopic.html',
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