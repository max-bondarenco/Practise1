import { Router } from 'express';
import {
  createFile,
  deleteFile,
  getAllFiles,
  getFile,
  updateFile
} from '../controllers/file.controller.js';

const router = Router();

router.route('/').get(getAllFiles).post(createFile);
router.route('/:id').get(getFile).patch(updateFile).delete(deleteFile);

export default router;
