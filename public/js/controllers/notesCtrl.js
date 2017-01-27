angular.module('clickEvent').controller('notesCtrl', function($scope, notesFactory, $state, userService){

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
