import { access } from 'fs/promises';
import { DB_PATH_BASE } from '../env.js';

export default async function userExists(userId: string) {
  try {
    const userDirName = `${DB_PATH_BASE}/users/${userId}`;
    await access(userDirName);
    return true;
  } catch (error: any) {
    return false;
  }
}
