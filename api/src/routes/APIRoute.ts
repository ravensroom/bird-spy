import express from 'express';
import { getJobsAPI, postFilterRules } from '../controllers/APIController.js';

const router = express.Router();

router.get('/jobs', getJobsAPI);
router.post('/jobs/rules', postFilterRules);

export default router;
