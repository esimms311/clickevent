angular.module('eventClick').directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      scope.openEditor = function(index){
        scope.editMode = true;
        if(index !== undefined) {
          scope.noteText = notesFactory.get(index).content;
          scope.index = index;
        } else {
          scope.noteText = undefined;
        };
        scope.save = function() {
          if (scope.noteText !== "" && scope.noteText !== undefined) {
            var note = {};
            note.title = scope.noteText.length> 50 ? scope.noteText.substring(0, 50) + '. . .'
            : scope.noteText;
            note.content = scope.noteText;
            if(scope.index == undefined)
            {
              if(localStorage.length > 0)
              {
              var existingNote = notesFactory.getLastNote();
              note.id = existingNote.id + 1;
            } else {
              note.id = 1;
            }
          }else {
            note.id = scope.index;
          }
          scope.notes = notesFactory.put(note);
        }
        scope.restore();
      };
      scope.delete = function(index){
        var status = confirm ('Do you want to Delete?');
        if(status)
        scope.notes = notesFactory.deleteById(index);
      }
      scope.delete = function() {
        scope.editMode = false;
        scope.index = undefined;
        scope.noteText = "";
      };
      var editor = elem.find('#editor');

      scope.restore();
      scope.notes = notesFActory.getAll();
      editor.bind('keyup keydown', function() {
        scope.noteText = editor.text().trim();
      });
    },
    templateUrl: 'notes.html'
  };
});
