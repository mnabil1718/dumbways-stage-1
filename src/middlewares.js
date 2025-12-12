import multer from "multer";
const upload = multer({ dest: "src/public/uploads/" });
export const singleImageUploadMiddleware = upload.single("image");
