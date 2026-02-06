import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudinary;
export const uploadReceipt = async (filePath) => {
    const result = cloudinary.uploader.upload(filePath, {
        folder: "receipt",
    });
    return (await result).secure_url;
};
