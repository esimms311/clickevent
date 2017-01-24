angular.module('clickEvent', ['ui.router', 'ngMap']).config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('/')

$stateProvider
.state('homeLanding', {
  url: '/',
  templateUrl: './js/views/mainLanding.html',
  controller: 'mainLandingCtrl'
})
.state('agenda', {
  url: '/agenda',
  templateUrl: './js/views/agenda.html',
  controller: 'agendaCtrl'
})
.state('maps', {
  url: '/maps',
  templateUrl:'./js/views/maps.html',
  controller: 'mapsCtrl'
})
.state('notes', {
  url: '/notes',
  templateUrl: './js/views/notes.html',
  controller: 'notesCtrl'
})
.state('eventinfo', {
  url: '/eventinfo',
  templateUrl: './js/views/eventinfo.html',
  controller: 'eventinfoCtrl'
})


});
