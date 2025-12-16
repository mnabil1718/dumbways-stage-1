import { Router } from "express";
import AuthController from "../controllers/auth-controller.js";
import { isAuthenticated, isGuest } from "../middlewares.js";

/***
 * @param {AuthController} controller
 */
export function registerAuthRoutes(controller) {
  const router = Router();

  router.get("/login", controller.getLoginPageHandler);

  router.get("/register", controller.getLoginPageHandler);

  router.post("/api/register", isGuest, controller.postUserHandler);

  router.post("/api/login", isGuest, controller.postAuthenticationHandler);

  router.post(
    "api/logout",
    isAuthenticated,
    controller.deleteAuthenticationHandler,
  );

  return router;
}
