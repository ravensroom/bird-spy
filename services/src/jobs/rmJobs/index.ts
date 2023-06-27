import { mkdir, readdir, unlink } from 'fs/promises';
import { DB_PATH_BASE } from '../../env.js';
import userExists from '../../users/userExists.js';

const rmJobs = async (userId: string) => {
  const exists = await userExists(userId);
  const cachedJobsFolder = `${DB_PATH_BASE}/${
    exists ? 'users' : 'anonymous'
  }/${userId}/jobs`;
  try {
    await mkdir(cachedJobsFolder, { recursive: true });
    const files = await readdir(cachedJobsFolder);
    for (const filename of files) {
      await unlink(cachedJobsFolder + '/' + filename);
    }
    console.log(`Cleared cached jobs at ${cachedJobsFolder}`);
  } catch (err) {
    console.log('Error when clearing cached jobs', err);
  }
};

export default rmJobs;
