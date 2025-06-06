import { Router } from 'express';
import { getCoinsList } from './coins';
import coinDetailsRouter from './coinDetails';

const router = Router();

// Coins list endpoint
router.get('/coins/markets', getCoinsList);

// Coin details endpoint
router.use('/coins', coinDetailsRouter);

export default router;