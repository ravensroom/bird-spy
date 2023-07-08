import express from 'express';
import jobsController from '../controllers/jobs.js';

const router = express.Router();

router.get('/', jobsController.getJobs);
router.post('/', jobsController.addJobs);
router.get('/rm', jobsController.rmJobs);
router.get('/run', jobsController.isRunning);

export default router;
