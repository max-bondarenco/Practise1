import { Router } from 'express';
import { keygen } from '../controllers/crypt.controller.js';

const router = Router();

router.route('/').post(keygen);

export default router;
