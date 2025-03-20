import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/handleInputErrors";
import { validateProjectId, validateTaskId } from "../middleware/validateId";
import { validateProjectInput } from "../middleware/validateProjectInput";
import { TaskController } from "../controllers/TaskController";
import { projectBelongsToUser, projectExists } from "../middleware/project";
import { validateTaskInput } from "../middleware/validateTaskInput";
import { validateTaskStatus } from "../middleware/validateTaskStatus";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.param("projectId", validateProjectId);
router.param("projectId", projectExists);
router.param("projectId", projectBelongsToUser);

router.param("taskId", validateTaskId);
router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

/**Routes for project **/
router.post(
  "/",
  validateProjectInput,
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get("/:projectId", ProjectController.getProjectById);
router.put(
  "/:projectId",
  validateProjectInput,
  handleInputErrors,
  ProjectController.updateProject
);
router.delete("/:projectId", ProjectController.deleteProject);

/**Routes for task **/
router.post(
  "/:projectId/tasks",
  validateTaskInput,
  handleInputErrors,
  TaskController.createTask
);
router.get("/:projectId/tasks", TaskController.getProjectTasks);
router.get("/:projectId/tasks/:taskId", TaskController.getTaskById);
router.put(
  "/:projectId/tasks/:taskId",
  validateTaskInput,
  handleInputErrors,
  TaskController.updateTask
);
router.delete("/:projectId/tasks/:taskId", TaskController.deleteTask);
router.post(
  "/:projectId/tasks/:taskId/status",
  validateTaskStatus,
  handleInputErrors,
  TaskController.updateTaskStatus
);

export default router;
