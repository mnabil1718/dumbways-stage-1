import { Router } from "express";
import PageController from "../controllers/page-controller.js";

/***
 * @param {PageController} controller
 */
export function registerPageRoutes(controller) {
  const router = Router();

  router.get("/", controller.getIndexPageHandler);

  router.get("/contact", controller.getContactPageHandler);

  router.get("/projects", controller.getProjectsPageHandler);

  router.get("/projects/:id", controller.getProjectDetailPageHandler);

  return router;
}
