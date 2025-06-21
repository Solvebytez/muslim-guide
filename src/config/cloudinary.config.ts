import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from './env.config';


cloudinary.config({
    cloud_name: config.CLOUDINERY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
})

export const createStorage = (folderName:string) => {
    try {

       return new  CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file) => {
                // const isImageChanged = (req as any).isImageChanged;
                // if(!(req as any).isImagechanged){
                //     return 
                // }
                return {
                    folder: folderName,
                    allowed_formats: ['jpg', 'png', 'jpeg','webp'],
                    format: 'webp', // Output format conversion
                    quality: 'auto:best', // Intelligent quality adjustment
                    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
                    resource_type: 'auto', // Handles both images and videos
                invalidate: true // CDN cache refresh
                }
            }
          }); 
        
    } catch (error) {
        console.error("Cloudinary storage setup failed:", error);
        throw error;
    }
}

  export default cloudinary