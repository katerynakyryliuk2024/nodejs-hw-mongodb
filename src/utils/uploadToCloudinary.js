import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';

cloudinary.v2.config({
  cloud_name: getEnvVar('CLODINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_SECRET'),
  api_secret: getEnvVar('CLOUDINARY_API_KEY'),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}
