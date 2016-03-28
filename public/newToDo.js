angular.module('toDoMongo')
  .controller('newToDo', function($scope, $http) {
    $scope.thingsToDos = [];
    $scope.getToDos = function(){
      $http.get('/stuff/todos').then(function(response) {
        $scope.thingsToDos = response.data;
        console.log($scope.thingsToDos)
      })
    }
    $scope.addNewTask = function(){
      $http.post('/stuff/todos', {
        task: $scope.newTask,
        done: false
      }).then(function(){
        $scope.newTask = ''
        $scope.getToDos();
      });
    //   $scope.thingsToDos.push({
    //     task: $scope.newTask,
    //     done: false
    //   });
    // console.log($scope.thingsToDos);
    $scope.newTask = ''
    };
    $scope.taskDone = function(id, done) {
      $http.get('/stuff/todos/'+id+'/'+done).then(function(){
        $scope.getToDos();
      })
      // $scope.thingsToDos.done = true;
    }
    $scope.deleteTask = function(id) {
      $http.delete('/stuff/todos/'+id).then(function(){
        $scope.getToDos();
      })
      // document.getElementById('task'+ $index).remove()
  }
});