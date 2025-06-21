import { createStorage } from "../config/cloudinary.config";
import multer from "multer";
import { ValidationError } from "../config/error.config";

export const createUploads = (folderName: string) => {
  const multerStorage = createStorage(folderName);

  const uploads = multer({
    storage: multerStorage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB file size limit
    },
    fileFilter: (req, file, cb) => {
      if (!file || !file.originalname || !file.mimetype) {
        const formatError = {
          field: "file",
          message: "File format not supported",
        };
        return cb(new ValidationError("Image Validation error", [formatError]));
      }
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        const formatError = {
          field: "file",
          message: "File format not supported",
        };
        return cb(new ValidationError("Image Validation error", [formatError]));
      }
      return cb(null, true);
    },
  });

  return {
    singleImage: uploads.single("image"),
    multipleImages: uploads.array("images", 5), // 10 is the maximum number of images allowed in the array
  }

};

export const profileUpload = createUploads("userProfile");
export const hotelImage = createUploads("hotelImage");
export const multipleUploads = createUploads("products");