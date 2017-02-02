angular.module('clickEvent').controller('questvoteCtrl', function($scope, questionsService){



var getQuestion = function(){
  questionsService.getQuestion().then(function(response){
    $scope.questions = response.data
  })
}
getQuestion();

$scope.addQuestion = function(newQuestion){
  newQuestion.id = $scope.questions.length + 1
  questionsService.addQuestion(newQuestion).then(function(res){
    if(res.data === 'success'){
      getQuestion()
    }
  })
}

$scope.selected = -1
$scope.toggleInputs = function(index){
  if(index === $scope.selected){
    $scope.selected = -1
  } else {
    $scope.selected = index
    $scope.question = $scope.questions[index].question
  }
}
$scope.update = function(updatedQuestion){
  $scope.selected = -1;
  questionsService.updateQuestion(updatedQuestion).then(function(res){
    if(res.data === 'updated!'){
      getQuestion()
    }
  })
}

$scope.delete = function(question){
  $scope.selected = -1;
  customersService.deleteQuestion(question).then(function(res){
    if(res.data === 'deleted'){
      getQuestion();
    }
  })
}


$scope.plusOne = function(index) {
   $scope.questions[index].likes += 1;
 };



})
