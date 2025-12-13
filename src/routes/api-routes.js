import { Router } from "express";
import ApiController from "../controllers/api-controller.js";
import { singleImageUploadMiddleware } from "../middlewares.js";

/***
 * @param {ApiController} controller
 */
export function registerAPIRoutes(controller) {
  const router = Router();

  router.get("/projects", controller.getProjectsHandler);

  router.get("/projects/:id", controller.getProjectHandler);

  router.post(
    "/projects",
    singleImageUploadMiddleware,
    controller.postProjectsHandler,
  );

  router.put(
    "/projects/:id",
    singleImageUploadMiddleware,
    controller.putProjectsHandler,
  );

  router.delete("/projects/:id", controller.deleteProjectHandler);

  return router;
}
