angular.module('clickEvent').service('questionsService', function($http, $q) {

    this.getQuestion = function() {
        return $http({
            method: 'GET',
            url: '/questions'
        })
    }
    this.addQuestion = function(newQuestion) {
        console.log(newQuestion);
        return $http({
            method: 'POST',
            url: '/questions',
            data: {question: newQuestion}
        })
    }
    this.updateQuestion = function(q) {
        return $http({
            method: 'PUT',
            url: '/questions/' + q.id,
            data: {likes: q.likes}
        })
    }
    this.deleteQuestion = function(question) {
        return $http({
            method: 'DELETE',
            url: '/api/questions/' + question.id
        })
    }


})
