angular.module('toDoMongo')
  .controller('registrationController', function($scope, $http){
    $scope.registration = function(a, b){
      $http.post('/register', {
        username: a,
        password: b
      })
      $scope.registrationInfo.username = ''
      $scope.registrationInfo.password = ''
    }
  })