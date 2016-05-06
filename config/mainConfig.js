(function(angular) {
  var app = angular.module('ForumApp');
  app.config(['$stateProvider', '$urlRouterProvider','$mdThemingProvider', stateParams])

  function stateParams($stateProvider, $urlRouterProvider,$mdThemingProvider) {


$mdThemingProvider.theme("default")
                  .primaryColor("blue")
                  .accentColor("red");
      
      
    $urlRouterProvider.otherwise('home')
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl',
    })
    $stateProvider.state('auth', {
      url: '/auth',
      templateUrl: 'views/auth.html',
      controller: 'authCtrl',
    })

    $stateProvider.state('authHome', {
      url: '/authHome',
      templateUrl: 'views/authHome.html',
      controller: 'authHome',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["refService", function(refService) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return refService.refAuth().$requireAuth();
        }]
      }
    })

    $stateProvider.state('authHome.desc', {
      url: '/desc',
      templateUrl: 'views/authDesc.html',
      controller: 'authDescCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["refService", function(refService) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return refService.refAuth().$requireAuth();
        }]
      }
    })

    $stateProvider.state('authHome.topic', {
      url: '/topic?AVATAR?DATE?EMAIL?TITLE?UID?USERNAME?VALUE?',
      templateUrl: 'views/topicDesc.html',
      controller: 'topicCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["refService", function(refService) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return refService.refAuth().$requireAuth();
        }]
      }
    })
    $stateProvider.state('authHome.profile', {
      url: '/profile:UID',
      templateUrl: 'views/profile.html',
      controller: 'profileCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["refService", function(refService) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return refService.refAuth().$requireAuth();
        }]
      }
    })

  $stateProvider.state('authHome.settings', {
      url: '/settings?UID?USERNAME',
      templateUrl: 'views/settings.html',
      controller: 'settingsCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["refService", function(refService) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return refService.refAuth().$requireAuth();
        }]
      }
    })
    
     $stateProvider.state('authHome.otherUser', {
      url: '/otherUser?DATE?UID',
      templateUrl: 'views/otherUserProfile.html',
      controller: 'otherUserProfileCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["refService", function(refService) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return refService.refAuth().$requireAuth();
        }]
      }
    })
  
  }
})(angular);