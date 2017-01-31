angular.module('clickEvent').service('notesService', function($http){

this.saveNote = function(noteObj){
return $http({
  method: 'POST',
  url: '/api/notes',
  data: noteObj
})
}

})
