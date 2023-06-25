import { Request, Response } from 'express';
//@ts-ignore
import { getAllJobs, changeRules } from '@bird-spy/services/dist/main.js';
//@ts-ignore
import { addJobs } from '@bird-spy/services/dist/main.js';

export const getJobs = async (req: Request, res: Response) => {
  try {
    addJobs();
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
