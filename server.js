var express = require('express');
var logger = require('morgan');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var PORT = 3000;

app.use(logger('dev'));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var db = 'mongodb://localhost/TasksDB'
var TasksDB = require('./model/tasks.js')
mongoose.connect(db)

app.get('/stuff/todos', function(req, res) {
  TasksDB.find({}).exec().then(function(dbTodos) {
    res.json(dbTodos);
  });
});

app.post('/stuff/todos', function(req, res) {
  var newTask = new TasksDB({
    task: req.body.task,
    done: req.body.done
  })
  newTask.save(function(err, response) {
    res.json(response)
  })

  // .then(function(response){
  //   res.json(response)
  //   console.log(response)
  // })
})

app.get('/stuff/todos/:id/:done', function(req, res){
  console.log(req.params.id)
  console.log(req.params.done)
  TasksDB.find({_id: req.params.id})
    .update({done: req.params.done})
    .then(function(){
      res.json({})
    });
  // if (TasksDB.find({_id: req.params.id}.done === false)) {
  //     TasksDB.find({_id: req.params.id}).update({done:true})
  //   .then(function(response){
  //     res.json({})
  //     console.log(response)
  //   })
  // } else {
  //   TasksDB.find({_id: req.params.id}).update({done:true})
  //   .then(function(response){
  //     res.json({})
  //     console.log(response)
  // }
});

app.delete('/stuff/todos/:id', function(req, res) {
  TasksDB.find({_id: req.params.id}).remove().then(function(){
    res.json({})
  })
})

app.listen(PORT, function() {
  console.log('listening on port: ' + PORT)
});