import multer from "multer";
import { config } from "./helper/config.js";
import crypto from "node:crypto";
import path from "path";
import { navItems } from "./helper/nav-data.js";

const storage = multer.diskStorage({
  destination: "src/public/uploads",
  filename: function (req, file, callback) {
    const name_split = file.originalname.split(".");
    const ext = path.extname(file.originalname); // .png, .jpg, etc
    const base = path.basename(file.originalname, ext);
    const id = crypto.randomBytes(6).toString("base64url");
    const filename = `${id}-${base}${ext}`;

    callback(null, filename);
  },
});
const uploadOpts = {
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
};
const upload = multer(uploadOpts);
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

export const setViewLocals = (req, res, next) => {
  res.locals.error = req.flash(config.session.errorFlashKey);
  res.locals.success = req.flash(config.session.successFlashKey);
  res.locals.navItems = navItems;
  res.locals.user = req.session.user;
  next();
};
