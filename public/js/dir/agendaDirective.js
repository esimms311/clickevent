angular.module('clickEvent').directive('agendaDirective', function() {

  function getColor() {
    var colors = ['blue', 'yellow', 'purple', 'mintcream', 'teal', 'burlywood']

    return colors[Math.floor(Math.random() * colors.length)];
  }



  return {
    restrict:'AE',
    templateUrl:'./public/js/views/agenda.html',
    link: function(scope, element, attributes) {
      element.on('click', function() {
        console.log('clicked')
        element.children().css('background-color', getColor());

      })
    }


    }

})
