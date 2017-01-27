angular.module('clickEvent').controller('indexCtrl', function($scope, $state, userService){

  var loggedIn = function(){
    userService.getCurrentUser().then( function(res){
      console.log(res);
      if(!res.data){
        $scope.in = false;
        $scope.notIn = true;
      }
      else {
        $scope.in = true;
        $scope.notIn = false;
      }
    })
  }
  loggedIn()
})
