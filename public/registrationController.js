angular.module('toDoMongo')
  .controller('registrationController', function($scope, $http){
    $scope.registration = function(){
      console.log($scope.registrationInfo)
    }
  })