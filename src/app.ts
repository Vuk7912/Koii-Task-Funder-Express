import express from 'express';

const app = express();

// Spider-Man hero endpoint
app.get('/spiderMan', (req, res) => {
  res.json({ hero: 'Spider-Man' });
});

export default app;