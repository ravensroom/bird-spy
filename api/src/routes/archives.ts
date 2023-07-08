import express from 'express';
import arhchivesController from '../controllers/archives.js';

const router = express.Router();

router.get('/', arhchivesController.getArchives);
router.post('/', arhchivesController.saveArchive);
router.post('/rm', arhchivesController.rmArchive);
router.post('/id', arhchivesController.getArchiveById);

export default router;
