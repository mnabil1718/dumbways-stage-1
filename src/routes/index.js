import { Router } from "express";
import { registerPageRoutes } from "./page-routes.js";
import { registerProjectRoutes } from "./project-routes.js";
import PageController from "../controllers/page-controller.js";
import ProjectController from "../controllers/project-controller.js";
import { registerTechnologyRoutes } from "./technology-routes.js";
import TechnologyController from "../controllers/technology-controller.js";

/***
 * @param {PageController} pageController
 * @param {ProjectController} projectController
 * @param {TechnologyController} technologyController
 *
 * @returns {Router}
 */
export function registerRoutes(
  pageController,
  projectController,
  technologyController,
) {
  const router = Router();

  router.use("/", registerPageRoutes(pageController));
  router.use("/", registerProjectRoutes(projectController));
  router.use("/", registerTechnologyRoutes(technologyController));

  return router;
}
