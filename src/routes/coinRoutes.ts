import express from 'express';
import { validate } from '../middleware/validate';
import { 
  coinListSchema, 
  coinDetailsSchema, 
  marketDataSchema 
} from '../schemas/coinSchema';

const router = express.Router();

// Example route with input validation middleware
router.get('/coins', 
  validate(coinListSchema, 'query'), 
  (req, res) => {
    // Access validated query parameters
    const { page, limit, order } = req.validatedQuery;
    
    // Simulated coin list response
    res.json({
      page,
      limit,
      order,
      coins: [
        { id: 'bitcoin', name: 'Bitcoin' },
        { id: 'ethereum', name: 'Ethereum' }
      ]
    });
  }
);

router.get('/coins/:id', 
  validate(coinDetailsSchema, 'params'), 
  (req, res) => {
    const { id } = req.validatedParams;
    
    // Simulated coin details response
    res.json({
      id,
      name: 'Sample Coin',
      price: 50000
    });
  }
);

router.get('/market', 
  validate(marketDataSchema, 'query'), 
  (req, res) => {
    const { ids, vs_currencies } = req.validatedQuery;
    
    // Simulated market data response
    res.json({
      ids,
      vs_currencies,
      prices: {}
    });
  }
);

export default router;