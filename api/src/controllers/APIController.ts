import { Request, Response } from 'express';
//@ts-ignore
import { getAllJobs } from '@bird-spy/services/dist/main.js';

export const getJobsAPI = async (req: Request, res: Response) => {
  try {
    const jobsData = await getAllJobs();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
