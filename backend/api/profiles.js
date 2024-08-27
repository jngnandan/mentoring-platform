const express = require('express');
const router = express.Router();
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

let db = global.db;

router.post('/', async (req, res) => {
  try {
    const { username, email, first_name, last_name, job, summary, company, profilepic, hobbies, achievements, contributions } = req.body;

    const insertQuery = `
      INSERT INTO profiles (
        username, email, first_name, last_name, job, summary, company, profilepic, hobbies, achievements, contributions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.run(insertQuery, [username, email, first_name, last_name, job, summary, company, profilepic, hobbies, achievements, contributions]);

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await db.all('SELECT * FROM profiles');
    res.json(data);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.get('SELECT * FROM profiles WHERE id = ?', [id]);

    if (!data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, first_name, last_name, job, summary, company, profilepic, hobbies, achievements, contributions } = req.body;

    const updateQuery = `
      UPDATE profiles SET
        username = ?, email = ?, first_name = ?, last_name = ?, job = ?, summary = ?, company = ?, profilepic = ?, hobbies = ?, achievements = ?, contributions = ?
      WHERE id = ?
    `;

    const result = await db.run(updateQuery, [username, email, first_name, last_name, job, summary, company, profilepic, hobbies, achievements, contributions, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run('DELETE FROM profiles WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
