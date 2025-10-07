import express from "express";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Route to get all tasks for a specific project
router.route("/project/:projectId").get(getTasksByProject);

// Route to create a new task
router.route("/").post(createTask);

// Routes to update or delete a specific task by its ID
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;