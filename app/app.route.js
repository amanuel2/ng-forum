(function (angular) {
    angular.module('ForumApp')
        .config(stateParams);

    /* @ngInject */
    function stateParams($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider.theme("default").primaryPalette("blue");
        $urlRouterProvider.otherwise('404');

        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/components/home/home.html',
                controller: 'homeCtrl'
            })
            .state('auth', {
                url: '/auth',
                templateUrl: 'app/components/auth/auth.html',
                controller: 'authCtrl'
            })
            .state('authHome', {
                url: '/authHome',
                templateUrl: 'app/components/authHome/authHome.html',
                controller: 'authHome',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('authHome.desc', {
                url: '/desc',
                templateUrl: 'app/components/authDesc/authDesc.html',
                controller: 'authDescCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["refService", function (refService) {
                    }]
                }
            })
            .state('authHome.topic', {
                url: '/topic/:POST/:USERNAME',
                templateUrl: 'app/components/topic/topicDesc.html',
                controller: 'topicCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('authHome.profile', {
                url: '/profile/:UID',
                templateUrl: 'app/components/profile/profile.html',
                controller: 'profileCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('authHome.settings', {
                url: '/settings?UID?USERNAME',
                templateUrl: 'app/components/settings/settings.html',
                controller: 'settingsCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('authHome.otherUser', {
                url: '/otherUser?DATE?UID',
                templateUrl: 'app/components/otherUserProfile/otherUserProfile.html',
                controller: 'otherUserProfileCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('ErrorFourOFour', {
                url: '/404',
                templateUrl: 'app/components/404/404.html',
                controller: '404Controller',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('loading', {
                url: '/loading',
                templateUrl: 'app/components/loading/loading.html',
                controller: 'loadingCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            })
            .state('authHome.otherUserPage', {
                url: '/:USERNAME/Activity',
                templateUrl: 'app/components/otherUserProfilePage/otherUserProfilePage.html',
                controller: 'otherUserProfilePageCtrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                }
            });
    }
})(angular);