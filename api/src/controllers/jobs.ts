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

export async function rmJobs(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    // stop the running scraper
    if (jobs.hasRunningInstance()) {
      jobs.stopAdding();
      await jobs.stoppedAdding();
    }
    await jobs.rmJobs(userId);
    res.status(201).json({ msg: 'Finished removing' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const isRunning = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ hasRunningJob: jobs.hasRunningInstance() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const jobsController = { addJobs, getJobs, rmJobs, isRunning };
export default jobsController;
