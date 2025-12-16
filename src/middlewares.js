import multer from "multer";
const upload = multer({ dest: "src/public/uploads/" });
export const singleImageUploadMiddleware = upload.single("image");

export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
    return;
  }

  res.redirect("/login");
};

export const isGuest = (req, res, next) => {
  if (!req.session.user) {
    next();
    return;
  }

  res.redirect("/");
};
