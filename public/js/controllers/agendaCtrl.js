angular.module('clickEvent').controller('agendaCtrl', function($scope, $state, userService){

  if(!userService.currentUser){
    $state.go('mainLanding')
    return
  }



})
