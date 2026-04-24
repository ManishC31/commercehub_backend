import { CloudinaryUpload } from "../types/cloudinary.types.ts";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileInCloudinary = async ({ folderName, filePath }: CloudinaryUpload) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });

    return result;
  } catch (error) {
    console.error("Failed to upload image in cloudinary", error);
    throw error;
  }
};
