var mongoose = require('mongoose');
var Schema = mongoose.Schema

var taskSchema = new Schema({
  task: String,
  done: Boolean
});

module.exports = mongoose.model('TasksDB', taskSchema)