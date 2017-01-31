angular.module('clickEvent').controller('indexCtrl', function($scope, $state, userService){

  var loggedIn = function(){
    userService.getCurrentUser().then( function(res){
      console.log(res);
      if(!res.data){
        $scope.in = false;
        $scope.notIn = true;
        userService.currentUser = '';
      }
      else {
        userService.currentUser = res.data;
        $scope.in = true;
        $scope.notIn = false;
      }
    })
  }
  loggedIn()
})
