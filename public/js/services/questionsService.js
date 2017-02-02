angular.module('clickEvent').service('questionsService', function($http, $q){

this.getQuestion = function(){
  return $http({
    method: 'GET',
    url: '/api/questions'
  })
}
this.addQuestion = function(newQuestion){
  console.log(newQuestion);
  return $http({
    method: 'POST',
    url: '/api/questions',
    data: JSON.stringify({"newQuestion":newQuestion})
  })
}
this.updateQuestion = function(updatedQuestion){
  return $http({
    method: 'PUT',
    url: '/api/questions/' + updatedQuestion.id,
    data: updatedQuestion
  })
}
this.deleteQuestion = function(question){
  return $http({
    method: 'DELETE',
    url: '/api/questions/' + question.id
  })
}


})
