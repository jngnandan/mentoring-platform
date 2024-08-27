// api/mobiles.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tableName = 'mobiles';
    const getDataQuery = `
      SELECT name, image_public_id, description, new_id, price
      FROM ${tableName};
    `;
    const data = await global.db.all(getDataQuery);
    res.json(data);
  } catch (error) {
    console.error('Error fetching mobiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
