(function(angular) {

  'use strict';
  
  angular
        .module('ForumApp')
        .controller('homeCtrl', ["$scope", "$state", "refService","loadingService", homeCtrl])

  function homeCtrl($scope, $state, refService,loadingService) {
    //var checkAuth = refService.ref().getAuth() ? $state.go("authHome.desc") : console.log("Not Logged In");
    // authCheckTrueService.checkAuth(refService.ref(), "authHome.desc");

    var circle = document.querySelector('.material-btn');
    var link = document.querySelector('.material-content').querySelectorAll('li');
    var ham = document.querySelector('.material-hamburger');
    var main = document.querySelector('main');
    var win = window;

    function openMenu(event) {

      circle.classList.toggle('active');
      ham.classList.toggle('material-close');
      main.classList.toggle('active');
      for (var i = 0; i < link.length; i++) {
        link[i].classList.toggle('active');
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function closeMenu() {
      if (circle.classList.contains('active')) {
        circle.classList.remove('active');
        for (var i = 0; i < link.length; i++) {
          link[i].classList.toggle('active');
        }
        ham.classList.remove('material-close');
        main.classList.remove('active');
      }
    }

    circle.addEventListener('click', openMenu, false);

    win.addEventListener('click', closeMenu, false);


  $scope.goTo = function(loc) {
    loadingService.setLoadingTo(loc);
    $state.go('loading')
  }

  }

})(angular);