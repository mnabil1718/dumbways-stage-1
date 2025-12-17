import multer from "multer";
import { config } from "./helper/config.js";
import crypto from "node:crypto";
import path from "path";
import { navItems } from "./helper/nav-data.js";

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

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

const fileFilterCallback = (req, file, callback) => {
  if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
    return callback(new Error("invalid image type"), false);
  }

  return callback(null, true);
};

const uploadOpts = {
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilterCallback,
};

const upload = multer(uploadOpts);
export const singleImageUploadMiddleware = upload.single("image");

export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash(config.session.errorFlashKey, "You need to login first");
  res.redirect("/login");
};

export const isGuest = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  req.flash(config.session.errorFlashKey, "You already authenticated");
  res.redirect("/");
};

export const setViewLocals = (req, res, next) => {
  res.locals.error = req.flash(config.session.errorFlashKey);
  res.locals.success = req.flash(config.session.successFlashKey);
  res.locals.navItems = navItems;
  res.locals.user = req.session.user;
  next();
};
