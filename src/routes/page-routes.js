import { Router } from "express";
import PageController from "../controllers/page-controller.js";

/***
 * @param {PageController} controller
 */
export function registerPageRoutes(controller) {
  const router = Router();

  router.get("/", controller.getIndexPageHandler);

  router.get("/contact", controller.getContactPageHandler);

  return router;
}
