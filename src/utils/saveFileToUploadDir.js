import path from 'node:path';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'tmp');
  const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads', 'photos');

  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );
  return `${getEnvVar('APP_DOMAIN')}/photos/${file.filename}`;
};
