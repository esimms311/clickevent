angular.module('clickEvent').directive('agendaDirective', function() {

return {
  restrict: 'A',
  scope: {
    speaker: '='
  },
  templateUrl: './js/views/agenda.html',
  }
})
