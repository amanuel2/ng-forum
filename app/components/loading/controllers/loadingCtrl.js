(function(angular){

  'use strict';    
    
  angular
      .module('ForumApp')
      .controller('loadingCtrl', ["$scope",'$state','refService','loadingService', loadingCtrlfunc])
    
    function loadingCtrlfunc($scope,$state,refService,loadingService){
        $scope.currentAuthGet = refService.ref().getAuth();
        $scope.title = "Ng-Forum";
        $scope.subTitle = "Loading...";
         setTimeout(function(){
             var loaderLoc = loadingService.getLoadingTo();
             if(loaderLoc) 
                $state.go(loaderLoc)
             else
                window.location.href = ''
         },3500)
    }
})(angular);