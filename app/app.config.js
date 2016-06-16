(function(angular) {
  var app = angular.module('ForumApp');
  app.config(['$stateProvider', '$urlRouterProvider','$mdThemingProvider', stateParams])

  function stateParams($stateProvider, $urlRouterProvider,$mdThemingProvider) {

$mdThemingProvider.theme("default")
                  .primaryPalette("blue")
      
      
    $urlRouterProvider.otherwise('404')
    
    $stateProvider.state('home', {
      url: '',
<<<<<<< HEAD:app/app.config.js
      templateUrl: 'app/components/home/home.html',
=======
      templateUrl: 'views/home.html',
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:config/mainConfig.js
      controller: 'homeCtrl',
    })
    $stateProvider.state('auth', {
      url: '/auth',
      templateUrl: 'app/components/auth/auth.html',
      controller: 'authCtrl',
    })

    $stateProvider.state('authHome', {
      url: '/authHome',
      templateUrl: 'app/components/authHome/authHome.html',
      controller: 'authHome',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })

    $stateProvider.state('authHome.desc', {
      url: '/desc',
      templateUrl: 'app/components/authDesc/authDesc.html',
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
<<<<<<< HEAD:app/app.config.js
      templateUrl: 'app/components/topic/topicDesc.html',
=======
      templateUrl: 'views/topicDesc.html',
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:config/mainConfig.js
      controller: 'topicCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    $stateProvider.state('authHome.profile', {
      url: '/profile/:UID',
<<<<<<< HEAD:app/app.config.js
      templateUrl: 'app/components/profile/profile.html',
=======
      templateUrl: 'views/profile.html',
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:config/mainConfig.js
      controller: 'profileCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })

  $stateProvider.state('authHome.settings', {
      url: '/settings?UID?USERNAME',
      templateUrl: 'app/components/settings/settings.html',
      controller: 'settingsCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    
     $stateProvider.state('authHome.otherUser', {
      url: '/otherUser?DATE?UID',
      templateUrl: 'app/components/otherUserProfile/otherUserProfile.html',
      controller: 'otherUserProfileCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    
    $stateProvider.state('ErrorFourOFour', {
      url: '/404',
<<<<<<< HEAD:app/app.config.js
      templateUrl: 'app/components/404/404.html',
=======
      templateUrl: 'views/404.html',
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:config/mainConfig.js
      controller: '404Controller',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
<<<<<<< HEAD:app/app.config.js
    $stateProvider.state('loading', {
      url:'/loading',
      templateUrl:'app/components/loading/loading.html',
      controller: 'loadingCtrl',
       resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
    
     $stateProvider.state('authHome.otherUserPage', {
      url: '/:USERNAME/Activity',
      templateUrl: 'app/components/otherUserProfilePage/otherUserProfilePage.html',
=======
    
    
     $stateProvider.state('authHome.otherUserPage', {
      url: '/:USERNAME/Activity',
      templateUrl: 'views/otherUserProfilePage.html',
>>>>>>> f0ad963ad1cdaef62f8fc70355d5af7e736899f7:config/mainConfig.js
      controller: 'otherUserProfilePageCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
      }
    })
  
  
  }
})(angular);