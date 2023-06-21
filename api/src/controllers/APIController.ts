import { Request, Response } from 'express';
import { getAllJobs } from '@bird-spy/services/src/main.js';

export const getJobsAPI = async (req: Request, res: Response) => {
  try {
    const jobsData = await getAllJobs();
    res.json(jobsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
