(function(angular) {
  var app = angular.module('ForumApp');
  app.config(['$stateProvider', '$urlRouterProvider','$mdThemingProvider', stateParams])

  function stateParams($stateProvider, $urlRouterProvider,$mdThemingProvider) {

$mdThemingProvider.theme("default")
                  .primaryPalette("blue")
      
      
    $urlRouterProvider.otherwise('404')
    
    $stateProvider.state('home', {
      url: '',
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
        }]
      }
    })

    $stateProvider.state('authHome.topic', {
      url: '/topic/:POST/:USERNAME',
      templateUrl: 'views/topicDesc.html',
      controller: 'topicCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    $stateProvider.state('authHome.profile', {
      url: '/profile/:UID',
      templateUrl: 'views/profile.html',
      controller: 'profileCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })

  $stateProvider.state('authHome.settings', {
      url: '/settings?UID?USERNAME',
      templateUrl: 'views/settings.html',
      controller: 'settingsCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    
     $stateProvider.state('authHome.otherUser', {
      url: '/otherUser?DATE?UID',
      templateUrl: 'views/otherUserProfile.html',
      controller: 'otherUserProfileCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    
    $stateProvider.state('ErrorFourOFour', {
      url: '/404',
      templateUrl: 'views/404.html',
      controller: '404Controller',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    
    
     $stateProvider.state('authHome.otherUserPage', {
      url: '/:USERNAME/Activity',
      templateUrl: 'views/otherUserProfilePage.html',
      controller: 'otherUserProfilePageCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
  
  
  }
})(angular);