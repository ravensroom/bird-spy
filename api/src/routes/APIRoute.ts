import express from 'express';
import { getJobs, postFilterRules } from '../controllers/APIController.js';

const router = express.Router();

router.get('/jobs', getJobs);
router.post('/jobs/rules', postFilterRules);

export default router;
