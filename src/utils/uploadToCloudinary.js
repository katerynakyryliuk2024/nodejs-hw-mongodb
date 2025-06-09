import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';

cloudinary.v2.config({
  cloud_name: getEnvVar('CLOUDİNARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDİNARY_APİ_KEY '),
  api_secret: getEnvVar('CLOUDİNARY_APİ_SECRET'),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}
