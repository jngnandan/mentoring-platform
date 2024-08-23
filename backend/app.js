const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const winston = require("winston");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk'
});

const app = express();
const dbPath = path.join(__dirname, "mydatabase2.db");
let db = null;

// Configure Winston for logging
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// CSP Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https://res.cloudinary.com/dgcfly5zo/"
  );
  next();
});

// Database initialization function
const initDatabase = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      username TEXT,
      email TEXT,
      first_name TEXT,
      last_name TEXT,
      job_title TEXT,
      bio TEXT,
      company TEXT,
      profile_picture TEXT,
      hobbies TEXT,
      achievements TEXT,
      contributions TEXT,
      last_updated TEXT,
      social_media_links TEXT,
      bookings TEXT
    )
  `);
};

// Fetch random user data from randomuser.me
const fetchRandomUserData = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];
    return {
      id: uuidv4(),
      username: user.login.username,
      email: user.email,
      first_name: user.name.first,
      last_name: user.name.last,
      job_title: "Software Developer",
      bio: "Enthusiastic developer with a passion for technology.",
      company: "Tech Solutions Inc.",
      profile_picture: user.picture.large,
      hobbies: "Reading, Coding, Traveling",
      achievements: "Developed a full-stack application",
      contributions: "Contributed to open-source projects",
      last_updated: new Date().toISOString(),
      social_media_links: JSON.stringify({
        linkedin: "https://www.linkedin.com/in/example",
        medium: "https://medium.com/@example",
        twitter: "https://twitter.com/example",
      }),
      bookings: JSON.stringify({
        recent_bookings: [
          { date: new Date().toISOString(), location: "New York" },
          { date: new Date().toISOString(), location: "San Francisco" },
        ],
      }),
    };
  } catch (error) {
    logger.error("Error fetching random user data:", error);
    return null;
  }
};

// Insert profiles into the database
const insertProfiles = async () => {
  try {
    const profiles = [];
    for (let i = 0; i < 20; i++) {
      const profile = await fetchRandomUserData();
      if (profile) {
        profiles.push(profile);
      }
    }
    // Insert profiles into the database
    await Promise.all(profiles.map(profile => db.run(`
      INSERT INTO profiles (
        id, username, email, first_name, last_name, job_title, 
        bio, company, profile_picture, hobbies, achievements, 
        contributions, last_updated, social_media_links, bookings
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      profile.id,
      profile.username,
      profile.email,
      profile.first_name,
      profile.last_name,
      profile.job_title,
      profile.bio,
      profile.company,
      profile.profile_picture,
      profile.hobbies,
      profile.achievements,
      profile.contributions,
      profile.last_updated,
      profile.social_media_links,
      profile.bookings,
    ])));

    logger.info("20 profiles have been inserted into the database.");
  } catch (error) {
    logger.error("Error inserting profiles:", error);
  }
};

logger.info("Setting up routes...");

// Define your routes
app.get("/test", (req, res) => {
  res.send("Test route is working");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

app.post("/generate-profiles", async (req, res) => {
  logger.info("Reached /generate-profiles route");
  try {
    await insertProfiles();
    res.status(201).json({ message: "20 profiles have been inserted into the database." });
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profiles", async (req, res) => {
  try {
    const data = await db.all("SELECT * FROM profiles");
    res.json(data);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Initialize database and start the server
const startServer = async () => {
  await initDatabase();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  logger.error("Error starting server:", error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 middleware
app.use((req, res) => {
  logger.info(`Received request for ${req.method} ${req.url}`);
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Mobile API routes
app.get("/mobiles", async (req, res) => {
  try {
    const tableName = "mobiles";
    const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id,
          price,
          brand,
          currys_price,
          amazon_link,
          currys_link
        FROM
          ${tableName};
      `;

    const data = await db.all(getDataQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id, { width: 400, height: 300, crop: 'fit' }), // Optimize images
      description: item.description,
      new_id: item.new_id,
      price: item.price,
      brand: item.brand,
      currys_price: item.currys_price,
      amazon_link: item.amazon_link,
      currys_link: item.currys_link
    }));

    res.json(transformedData);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle brand-specific mobile requests
const handleBrandRequest = (brand) => async (req, res) => {
  try {
    const getDataByBrandQuery = `
      SELECT
        name,
        image_public_id,
        description,
        new_id,
        price
      FROM
        ${brand.toLowerCase()};
    `;

    const data = await db.all(getDataByBrandQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id, { width: 400, height: 300, crop: 'fit' }),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
      brand: brand.toLowerCase(),
    }));

    res.json(transformedData);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Brand-specific routes
app.get("/mobiles/apple", handleBrandRequest("Apple"));
app.get("/mobiles/samsung", handleBrandRequest("Samsung"));
app.get("/mobiles/google", handleBrandRequest("Google"));
app.get("/mobiles/xiaomi", handleBrandRequest("Xiaomi"));
app.get("/mobiles/oneplus", handleBrandRequest("OnePlus"));
app.get("/mobiles/oneplus", handleBrandRequest("OnePlus"));

