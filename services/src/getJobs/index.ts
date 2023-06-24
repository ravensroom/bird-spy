import { readFile, readdir } from 'fs/promises';
import { Job } from '../types.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });
const DB_PATH_BASE = process.env.DB_PATH_BASE || '.';

export default async function getAllJobs() {
  const jobs: Job[] = [];
  try {
    const files = await readdir(DB_PATH_BASE);
    for (const file of files) {
      const filePath = DB_PATH_BASE + '/' + file;
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
