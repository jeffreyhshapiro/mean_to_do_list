var mongoose = require('mongoose');
var Schema = mongoose.Schema

var taskSchema = new Schema({
  task: String,
  done: Boolean,
  user: [{type: Schema.Types.ObjectId, ref: 'UsersDB'}]
});

module.exports = mongoose.model('TasksDB', taskSchema)