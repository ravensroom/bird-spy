import { Request, Response } from 'express';
//@ts-ignore
import { configs } from '@bird-spy/services/dist/main.js';

export const saveConfig = async (req: Request, res: Response) => {
  try {
    await configs.saveConfig(req.body);
    res.status(201).json({ msg: 'Config is saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getConfigs = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const configsData = await configs.getConfigs(userId);
    res.json(configsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
