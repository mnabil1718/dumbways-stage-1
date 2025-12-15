import { Router } from "express";
import TechnologyController from "../controllers/technology-controller.js";

/***
 * @param {TechnologyController} controller
 */
export function registerTechnologyRoutes(controller) {
  const router = Router();

  router.get("/api/technologies", controller.getTechnologiesHandler);

  return router;
}
