import Task from "../models/Task.js";

// @desc    Get tasks for a specific project
// @route   GET /api/tasks/project/:projectId
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found for this project" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  const { title, description, projectId, status } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: "Title and projectId are required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      projectId,
      status,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task: " + error.message });
  }
};

// @desc    Update a task (e.g., its status)
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Run schema validators
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task: " + error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};