const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user
  });
  res.json(task);
};
