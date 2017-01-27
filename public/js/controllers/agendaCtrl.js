angular.module('clickEvent').controller('agendaCtrl', function($scope, $state, userService){

  var loggedIn = function(){
    userService.getCurrentUser().then( function(res){
      console.log(res);
      if(!res.data){
        $state.go('mainLanding');
      }
    })
  }
  loggedIn()




})
