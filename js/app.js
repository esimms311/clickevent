angular.module('clickEvent', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('/')

$stateProvider
.state('homeLanding', {
  url: '/',
  templateUrl: './js/views/mainLanding.html',
  controller: 'mainLandingCtrl'
})
.state('agenda', {
  url: '/agenda',
  templateUrl: './views/agenda.html',
  controller: 'agendaCtrl'
})
.state('maps', {
  url: '/maps',
  templateUrl:'./js/views/maps.html',
  controller: 'mapsCtrl'
})
.state('notes', {
  url: '/notes',
  templateUrl: './views/notes.html'
  controller: 'notesCtrl'
})


});
