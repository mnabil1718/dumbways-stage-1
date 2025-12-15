import { Router } from "express";
import { singleImageUploadMiddleware } from "../middlewares.js";
import ProjectController from "../controllers/project-controller.js";

/***
 * @param {ProjectController} controller
 */
export function registerProjectRoutes(controller) {
  const router = Router();

  router.get("/api/projects", controller.getProjectsHandler);

  router.get("/api/projects/:id", controller.getProjectHandler);

  router.post(
    "/api/projects",
    singleImageUploadMiddleware,
    controller.postProjectsHandler,
  );

  router.put(
    "/api/projects/:id",
    singleImageUploadMiddleware,
    controller.putProjectsHandler,
  );

  router.delete("/api/projects/:id", controller.deleteProjectHandler);

  router.get("/projects", controller.getProjectsPageHandler);

  router.get("/projects/:id", controller.getProjectDetailPageHandler);

  return router;
}
