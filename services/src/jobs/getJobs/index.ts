import { readFile, readdir } from 'fs/promises';
import { Job } from '../../types.js';
import { DB_PATH_BASE } from '../../env.js';
import userExists from '../../users/userExists.js';

export default async function getJobs(userId: string) {
  const jobs: Job[] = [];
  const exists = await userExists(userId);
  const jobsDirName = `${DB_PATH_BASE}/${exists ? 'users' : 'anonymous'}/jobs`;
  try {
    const files = await readdir(jobsDirName);
    for (const file of files) {
      const filePath = jobsDirName + '/' + file;
      const data = await readFile(filePath, 'utf8');
      const job: Job = JSON.parse(data);
      jobs.push(job);
    }
  } catch (err) {
    console.error(err);
    return [];
  }
  return jobs;
}
