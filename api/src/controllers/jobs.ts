import { Request, Response } from 'express';
//@ts-ignore
import { jobs } from '@bird-spy/services/dist/main.js';

export const addJobs = async (req: Request, res: Response) => {
  try {
    const config = req.body;
    await jobs.addJobs(config);
    res.status(201).json({ msg: 'Finished adding' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function getJobs(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    const jobsData = await jobs.getJobs(userId);
    res.json(jobsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
