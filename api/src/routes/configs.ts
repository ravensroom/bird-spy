import express from 'express';
import configsController from '../controllers/configs.js';

const router = express.Router();

router.get('/', configsController.getConfigs);
router.post('/', configsController.saveConfig);
router.post('/rm', configsController.rmConfig);
router.post('/id', configsController.getConfigById);

export default router;
