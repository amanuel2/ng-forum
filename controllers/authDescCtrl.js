(function(angular) {
  var app = angular.module('ForumApp');

  app.controller('authDescCtrl', ["$scope", "$mdDialog", "$state", "$firebaseObject","refService","currentAuth","$firebaseArray",authDescCtrl])
  
  function authDescCtrl($scope, $mdDialog, $state, $firebaseObject,refService,currentAuth,$firebaseArray){
    
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

    $scope.goToTOPICAUTCOMPLETE = function(info){
      $state.go("authHome.topic", {
        "AVATAR": info.Avatar,
        "DATE": info.DateCreated,
        "EMAIL": info.Email,
        "TITLE": info.Title,
        "UID": info.UID,
        "USERNAME": info.Username,
        "VALUE": info.Value
      })
    }
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