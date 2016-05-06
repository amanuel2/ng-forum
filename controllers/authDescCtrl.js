(function(angular) {
  var app = angular.module('ForumApp');

  app.controller('authDescCtrl', ["$scope", "$mdDialog", "$state", "$firebaseObject","refService","currentAuth",authDescCtrl])
  
  function authDescCtrl($scope, $mdDialog, $state, $firebaseObject,refService,currentAuth){
    
      $scope.topic = $firebaseObject(refService.ref().child("Topics"))


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

    $scope.goToTopic = function(avatar, date, email, title, uid, username, value) {
      $state.go("authHome.topic", {
        "AVATAR": avatar,
        "DATE": date,
        "EMAIL": email,
        "TITLE": title,
        "UID": uid,
        "USERNAME": username,
        "VALUE": value
      })

    }

  }
})(angular);