(function(){
    
    
    var app = angular.module('ForumApp')
    
    app.controller('otherUserProfilePageCtrl', ["$scope","$stateParams","otherUserProfilePageService", otherUserProfilePageCtrlFunc])
    
    
    function otherUserProfilePageCtrlFunc($scope,$stateParams,otherUserProfilePageService){
        $scope.otherUSERIDPAGE = otherUserProfilePageService.getID();
        console.log($scope.otherUSERIDPAGE);
        
    }
    
    
})(angular);