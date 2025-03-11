import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { validateProjectInput } from "../middleware/ValidateProjectInput";
import { handleInputErrors } from "../middleware/handleInputErrors";
import { validateId } from "../middleware/validateId";

const router = Router();

router.param("id", validateId);

router.post(
  "/",
  validateProjectInput,
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);

router.get("/:id", ProjectController.getProjectById);

router.put(
  "/:id",
  validateProjectInput,
  handleInputErrors,
  ProjectController.updateProject
);

router.delete("/:id", ProjectController.deleteProject);

export default router;
