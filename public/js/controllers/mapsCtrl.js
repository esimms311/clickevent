angular.module('clickEvent').controller('mapsCtrl', function($scope, $state, userService){
//
// $scope.getMap = function(){
//   mapsService.getMap().then(function(response){
//     $scope.maps = response.config.url;
//     console.log(response)
//   })
// }
//
if(!userService.currentUser){
  $state.go('mainLanding')
  return
}
//
})
