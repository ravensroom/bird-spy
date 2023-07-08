import express from 'express';
import jobsRoute from './jobs.js';
import archivesRoute from './archives.js';
import configsRoute from './configs.js';
import usersRoute from './users.js';

const router = express.Router();

router.use('/jobs', jobsRoute);
router.use('/archives', archivesRoute);
router.use('/configs', configsRoute);
router.use('/users', usersRoute);

export default router;
