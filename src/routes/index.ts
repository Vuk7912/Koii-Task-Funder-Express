import { Router } from 'express';
import { getCoinsList } from './coins';
import coinDetailsRouter from './coinDetails';
import { validateCoinListParams } from '../middleware/inputValidation';

const router = Router();

// Coins list endpoint with input validation
router.get('/coins/markets', validateCoinListParams, getCoinsList);

// Coin details endpoint
router.use('/coins', coinDetailsRouter);

export default router;