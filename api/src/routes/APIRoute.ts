import express from 'express';
import { saveConfig, getConfigs } from '../controllers/configs.js';
import { addJobs, getJobs, rmJobs, isRunning } from '../controllers/jobs.js';

const router = express.Router();

router.get('/jobs', getJobs);
router.post('/jobs', addJobs);
router.get('/jobs/rm', rmJobs);
router.get('/jobs/run', isRunning);

router.post('/configs', saveConfig);
router.get('/configs', getConfigs);

export default router;
