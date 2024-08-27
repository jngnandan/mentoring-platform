const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const http = require('http');

// Import route files
const dealsRoutes = require('./api/deals');
const mobilesRoutes = require('./api/mobiles');
const profilesRoutes = require('./api/profiles');
const brandsRoutes = require('./api/brands');

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk',
});

const app = express();
const dbPath = path.join(__dirname, 'mydatabase2.db');
global.db = null;

const initializeDBAndServer = async () => {
  try {
    global.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const PORT = process.env.PORT || 3002;

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors({
      origin: 'https://protocon.co.uk', // Allow requests from your domain
    }));
    app.use(express.json()); // For parsing JSON bodies

    // Use the imported routes
    app.use('/deals', dealsRoutes);
    app.use('/mobiles', mobilesRoutes);
    app.use('/profiles', profilesRoutes);
    app.use('/brands', brandsRoutes);

    // Use HTTP server for Vercel
    const server = http.createServer(app);

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });

  } catch (error) {
    console.error('Error initializing the server:', error);
    process.exit(1);
  }
};

initializeDBAndServer();

module.exports = app;
