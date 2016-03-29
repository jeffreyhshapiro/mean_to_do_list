angular.module('toDoMongo')
  .controller('registrationController', function($scope, $http){
    $scope.registration = function(a, b){
      console.log($scope.registrationInfo)
      $http.post('/register', {
        username: a,
        password: b
      })
    }
  })