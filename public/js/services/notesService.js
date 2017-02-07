angular.module('clickEvent').service('notesService', function($http){

this.saveNote = function(noteObj){
return $http({
  method: 'POST',
  url: '/api/notes',
  data: noteObj
})
}

this.getNotes = function(id){
  return $http({
    method: 'GET',
    url: '/api/notes/' + id

  })
}

this.editNote = function(noteObj){
  return $http({
    method: 'PUT',
    url: '/api/notes',
    data: noteObj
  })
}
})
