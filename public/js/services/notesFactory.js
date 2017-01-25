angular.module('clickEvent').factory('notesFactory', function() {


return {
    put: function(note) {
      localStorage.setItem('note' + note.id, JSON.stringify(note));
      return this.getAll();
    },
    get: function(index) {
      return JSON.parse(localStorage.getItem('note' + index));
    },
    getLastNote: function(){
      var lastNote = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf('note') !== -1) {
          var note = localStorage.getItem(localStorage.key(i));
          lastNote = JSON.parse(note);
        }
      }
      return lastNote;
    },
    getAll: function() {
      var notes = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf('note') !== -1) {
          var note = localStorage.getItem(localStorage.key(i));
          notes.push(JSON.parse(note));
        }
      }
      return notes;
    },
    deleteById: function(index){
      for (var i = 0; i < localStorage.length; i++) {
          if(localStorage.key(i) == 'note'+index)
            {
              localStorage.removeItem(localStorage.key(i));
              break;
            }
      }
      return this.getAll();
    }
  };
});
// angular.module('clickEvent').factory('notesFactory', function() {
//   return {
//     put: function(note) {
//       localStorage.setItem('note' + note.id, JSON.stringify(note));
//       return this.getAll();
//     },
//     get: function(index) {
//       return JSON.parse(localStorage.getItem('note' + index));
//     },
//     getLastNote: function(){
//       var lastNote = [];
//       for (var i = 0; i &lt; localStorage.length; i++) {
//         if (localStorage.key(i).indexOf('note') !== -1) {
//           var note = localStorage.getItem(localStorage.key(i));
//           lastNote = JSON.parse(note);
//         }
//       }
//       return lastNote;
//     },
//     getAll: function() {
//       var notes = [];
//       for (var i = 0; i &lt; localStorage.length; i++) {
//         if (localStorage.key(i).indexOf('note') !== -1) {
//           var note = localStorage.getItem(localStorage.key(i));
//           notes.push(JSON.parse(note));
//         }
//       }
//       return notes;
//     },
//     deleteById: function(index){
//       for (var i = 0; i &lt; localStorage.length; i++) {
//           if(localStorage.key(i) == 'note'+index)
//             {
//               localStorage.removeItem(localStorage.key(i));
//               break;
//             }
//       }
//       return this.getAll();
//     }
//   };
// });
