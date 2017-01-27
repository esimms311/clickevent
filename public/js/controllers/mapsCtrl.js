angular.module('clickEvent').controller('mapsCtrl', function($scope, $state, userService){
//
// $scope.getMap = function(){
//   mapsService.getMap().then(function(response){
//     $scope.maps = response.config.url;
//     console.log(response)
//   })
// }
//
var loggedIn = function(){
  userService.getCurrentUser().then( function(res){
    console.log(res);
    if(!res.data){
      $state.go('mainLanding');
    }
  })
}
loggedIn()
//
})
