const Task = require('../models/Task')

// Get all tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 })
  res.json(tasks)
}

// Create a task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete a task
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json({ message: 'Task deleted' })
}