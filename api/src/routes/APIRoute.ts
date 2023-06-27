import express from 'express';
import {
  saveConfig,
  getConfigs,
  rmConfig,
  getConfigById,
} from '../controllers/configs.js';
import { addJobs, getJobs, rmJobs, isRunning } from '../controllers/jobs.js';

const router = express.Router();

router.get('/jobs', getJobs);
router.post('/jobs', addJobs);
router.get('/jobs/rm', rmJobs);
router.get('/jobs/run', isRunning);

router.get('/configs', getConfigs);
router.post('/configs', saveConfig);
router.post('/configs/rm', rmConfig);
router.post('/configs/id', getConfigById);

export default router;
