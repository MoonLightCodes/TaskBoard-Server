import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Route for getting all projects and creating a new one
router.route("/").get(getProjects).post(createProject);

// Route for deleting a project
router.route("/:id").delete(deleteProject);

export default router;