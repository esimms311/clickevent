angular.module('clickEvent').controller('notesCtrl', function($scope, notesService, $state, userService){

  if(!userService.currentUser){
    $state.go('mainLanding')
    return
  }

$scope.saveNote = function(notes){
  var noteObj = {notes : notes, userid : userService.currentUser.id}
  notesService.saveNote(noteObj).then(function(response){
    console.log(response.data);
  })
}

$scope.editNote = function(notes){
  userService.currentUser.notes 
}

})
