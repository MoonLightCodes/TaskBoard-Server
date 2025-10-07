import Project from "../models/Project.js";
import Task from "../models/Task.js";

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error creating project: " + error.message });
  }
};

// @desc    Delete a project and all its associated tasks
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete all tasks associated with the project
    await Task.deleteMany({ projectId: req.params.id });

    // Delete the project itself
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project and associated tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};