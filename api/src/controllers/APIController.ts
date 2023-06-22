import { Request, Response } from 'express';
//@ts-ignore
import { getAllJobs, changeRules } from '@bird-spy/services/dist/main.js';

export const getJobsAPI = async (req: Request, res: Response) => {
  try {
    const jobsData = await getAllJobs();
    res.json(jobsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const postFilterRules = async (req: Request, res: Response) => {
  try {
    const rules = await changeRules(req.body);
    res.json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
