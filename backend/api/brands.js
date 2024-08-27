const express = require('express');
const router = express.Router();
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cloudinary = require('cloudinary').v2;

// Use the global db object if initialized in app.js
let db = global.db;

router.get('/:brand', async (req, res) => {
  try {
    const { brand } = req.params;
    const tableName = brand;
    const getDataQuery = `
      SELECT
        name,
        image_public_id,
        description,
        new_id,
        price
      FROM
        ${tableName};
    `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map(item => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error(`Error fetching ${brand} data:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
