angular.module('clickEvent').service('userService', function($http){

this.currentUser;

  this.getCurrentUser = function(){
    return $http({
      method: 'GET',
      url: '/verifyuser'
    })
  }

})
