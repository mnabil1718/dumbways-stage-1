import multer from "multer";
import { config } from "./helper/config.js";
import crypto from "node:crypto";
import path from "path";

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
const upload = multer({ storage });
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
