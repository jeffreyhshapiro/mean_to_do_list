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
var UsersDB = require('./model/users.js')
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
})

app.get('/stuff/todos/:id/:done', function(req, res){
  TasksDB.find({_id: req.params.id})
    .update({done: req.params.done})
    .then(function(){
      res.json({})
    });
});

app.delete('/stuff/todos/:id', function(req, res) {
  TasksDB.find({_id: req.params.id}).remove().then(function(){
    res.json({})
  })
})

app.get('/login/:username/:password', function(req, res) {
  UsersDB.find({username: req.params.username, password: req.params.password}, function(err, response){
    if (err) {
      throw err
    } else {
      res.json({})
      console.log('success!')
    }
  })
})

app.post('/register', function(req, res){
  var newUser = new UsersDB({
    username: req.body.username,
    password: req.body.password
  })
  newUser.save(function(err, response) {
    res.json(response)
  })
})

app.listen(PORT, function() {
  console.log('listening on port: ' + PORT)
});