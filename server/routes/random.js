import express from 'express';
import { getRandom } from '../controllers/random.js'

const router = express.Router();
router.get('/', getRandom);

export default router;