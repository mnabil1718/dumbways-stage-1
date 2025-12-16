import multer from "multer";
import { config } from "./helper/config.js";
const upload = multer({ dest: "src/public/uploads/" });
export const singleImageUploadMiddleware = upload.single("image");

export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash(config.session.flashKey, "You need to login first");
  res.redirect("/login");
};

export const isGuest = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  req.flash(config.session.flashKey, "You already authenticated");
  res.redirect("/");
};
