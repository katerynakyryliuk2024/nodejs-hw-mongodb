import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_SECRET'),
  api_secret: getEnvVar('CLOUDINARY_API_KEY'),
});

// export function uploadToCloudinary(filePath) {
//   return cloudinary.v2.uploader.upload(filePath);
// }

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
