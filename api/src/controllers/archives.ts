import { Request, Response } from 'express';
//@ts-ignore
import { archives } from '@bird-spy/services/dist/main.js';

export const saveArchive = async (req: Request, res: Response) => {
  try {
    await archives.saveArchive(req.body);
    res.status(201).json({ msg: 'Archive is saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const rmArchive = async (req: Request, res: Response) => {
  try {
    const { userId, archiveId } = req.body;
    await archives.rmArchive(userId, archiveId);
    res.status(201).json({ msg: 'Archive is removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getArchiveById = async (req: Request, res: Response) => {
  try {
    const { userId, archiveId } = req.body;
    const archiveData = await archives.getArchiveById(userId, archiveId);
    res.json(archiveData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getArchives = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const archivesData = await archives.getArchives(userId);
    res.json(archivesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
