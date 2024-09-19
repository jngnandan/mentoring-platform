const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from your frontend's origin
app.use(cors({
  origin: 'http://localhost:3000', // Change this to your frontend URL if different
  methods: ['GET', 'POST'], // Add the methods you want to allow
  credentials: true // Include credentials if needed
}));

// Your routes go here
app.get('/profiles', (req, res) => {
  // Your logic to fetch profiles
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});