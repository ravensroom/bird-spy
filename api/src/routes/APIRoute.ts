import express from 'express';
import { getJobsAPI } from '../controllers/APIController.js';

const router = express.Router();

router.get('/jobs', getJobsAPI);

export default router;
