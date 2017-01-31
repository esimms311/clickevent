angular.module('clickEvent').controller('eventinfoCtrl', function($scope, $state, userService){

  if(!userService.currentUser){
    $state.go('mainLanding')
    return
  }

})
