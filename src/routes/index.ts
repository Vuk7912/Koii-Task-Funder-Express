import { Router } from 'express';
import { getCoinsList } from './coins';

const router = Router();

// Coins list endpoint
router.get('/coins/markets', getCoinsList);

export default router;