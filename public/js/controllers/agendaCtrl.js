angular.module('clickEvent').controller('agendaCtrl', function($scope, $state, userService){

  if(!userService.currentUser){
    $state.go('mainLanding')
    return
  }

$scope.speakers = [
  {
    name: 'Jeremy Robertson',
    time: '9:00 A.M.',
    location: 'Downstairs Common Area',
    session: 'Welcome to DevMountain',
    image: 'https://devmountain.com/img/pic-jeremy.jpg'
  },
  {
    name: 'Brett Caudill',
    time: '10:00 A.M.',
    location: 'Timpanogos',
    session: 'Best Steps to Becoming a Successful Dev',
    image: 'https://pbs.twimg.com/profile_images/694248340704272384/Z_QhvbaG.jpg'
  },
  {
    name: 'Scott Gourley',
    time: '1:00 P.M.',
    location: 'Baldy',
    session: 'Listen to your Mentors',
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAl-AAAAJGQ2OTU4MzAyLWNiODEtNDU4Yy05MzczLTJiOGE4ZmViNjZlMQ.jpg'
  },
  {
    name: 'Tom Pridham',
    time: '2:30 P.M.',
    location: 'Nebo',
    session: 'How to Ride a Bike in the Winter in Shorts',
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAe3AAAAJDA3N2NmYjNhLWNkYjktNDA3Zi1iYTEwLTRjNWZkZTc3NzAzYQ.jpg'
  },
  {
    name: 'Doug Maxfield',
    time: '4:00 P.M.',
    location: 'Oferhorn',
    session: 'How to get a Job',
    image: 'http://offender.fdle.state.fl.us/offender/CallImage?imgID=2416465'
  },
  {
    name: 'Jeremy Robertson',
    time: '5:00 P.M.',
    location: 'Downstairs Common Area',
    session: 'Now go get a Job ya Filthy Animals',
    image: 'https://devmountain.com/img/pic-jeremy.jpg'
  }
]

})
