angular.module('toDoMongo')
  .controller('loginController', function($scope, $http){
    $scope.login = function(c, d){
      $http.get('/login/'+c+'/'+d, {
        username: c,
        password: d,
        authenticated: true
      })
      $scope.login.username = ''
      $scope.login.password = ''
    }
  })