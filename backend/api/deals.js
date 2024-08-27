const express = require('express');
const router = express.Router();
const gsmarena = require('gsmarena-api');

router.get('/', async (req, res) => {
  try {
    const deals = await gsmarena.deals.getDeals();
    res.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
