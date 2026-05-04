const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: 'To Do' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
