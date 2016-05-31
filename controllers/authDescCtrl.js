(function(angular) {
  var app = angular.module('ForumApp');

  app.controller('authDescCtrl', ["$scope", "$mdDialog", "$state","$mdMedia", "$mdBottomSheet","$firebaseObject","refService","$firebaseArray",authDescCtrl])
  
  function authDescCtrl($scope, $mdDialog, $state,$mdMedia,$mdBottomSheet, $firebaseObject,refService,$firebaseArray){
    
      $scope.authDataDesc = refService.ref().getAuth();
      
      
      $scope.topic = $firebaseObject(refService.ref().child("Topics"))
      $scope.topicName = $firebaseArray(refService.ref().child("Topics"))

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

            }

            else {


            }
        }

    $scope.goToTOPICAUTCOMPLETE = function(info){
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