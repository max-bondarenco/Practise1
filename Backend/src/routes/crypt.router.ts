import { Router } from 'express';
import { encrypt, getAllCrypts } from '../controllers/crypt.controller.js';

const router = Router();

router.route('/').get(getAllCrypts).post(encrypt);

export default router;
