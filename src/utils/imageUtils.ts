import cloudinary from "../config/cloudinary.config"
import { BadRequestError } from "../config/error.config"
import { Image } from "../models/image.model"


export const getImagePublicId = async (userId:string) => {
    const publicId= await Image.findOne({userId:userId}).select("public_id").lean()
    if (!publicId) return null
    return publicId?.public_id?.split("/")[1] || null
}

export const deleteImagefromCloudnery = async (publicId:string) => {
    if (!publicId) return;
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== "ok" && result.result !== "not found") {
            throw new BadRequestError("Failed to delete image from Cloudinary");
        }
        return true
      } catch (err) {
        console.error("Cloudinary deletion error:", err);
        throw new BadRequestError("Failed to delete image from Cloudinary");
      }
}