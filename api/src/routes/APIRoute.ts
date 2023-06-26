import express from 'express';
import { saveConfig, getConfigs } from '../controllers/configs.js';
import { addJobs, getJobs } from '../controllers/jobs.js';

const router = express.Router();

router.get('/jobs', getJobs);
router.post('/jobs', addJobs);

router.post('/configs', saveConfig);
router.get('/configs', getConfigs);

export default router;
