const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const path = require('path');

const dbPath = path.join(__dirname, "mydatabase2.db");
const db = new sqlite3.Database(dbPath);

// Function to fetch a random user profile from randomuser.me
const fetchRandomUserData = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    return {
      id: uuidv4(),
      username: user.login.username,
      email: user.email,
      first_name: user.name.first,
      last_name: user.name.last,
      job_title: "Software Developer", // Matches the 'job' column
      bio: "Enthusiastic developer with a passion for technology.", // Matches the 'summary' column
      company: "Tech Solutions Inc.",
      profile_picture: user.picture.large, // Matches the 'profilepic' column
      hobbies: "Reading, Coding, Traveling",
      achievements: "Developed a full-stack application",
      contributions: "Contributed to open-source projects",
      last_updated: new Date().toISOString(), // Matches the 'created_at' column
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
    console.error('Error fetching random user data:', error);
    return null;
  }
};

// Function to create the table and insert profiles into the database
// Function to create the table and insert profiles into the database
const insertProfiles = async () => {
  try {
    const profiles = [];
    for (let i = 0; i < 20; i++) {
      const profile = await fetchRandomUserData();
      if (profile) {
        profiles.push(profile);
      }
    }

    db.serialize(() => {
      // Create table if it does not exist
      db.run(`CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY,
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        social_media_links TEXT,
        bookings TEXT,
        experience TEXT
      )`);

      // Insert profiles into the table
      const stmt = db.prepare(`INSERT INTO profiles (
        id, username, email, first_name, last_name, job_title, bio, company, profile_picture, hobbies, achievements, contributions, created_at, social_media_links, bookings, experience
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

      profiles.forEach(profile => {
        stmt.run(
          null, // Auto-increment id
          profile.username,
          profile.email,
          profile.first_name,
          profile.last_name,
          profile.job_title, // Maps to 'job_title'
          profile.bio, // Maps to 'bio'
          profile.company,
          profile.profile_picture, // Maps to 'profile_picture'
          profile.hobbies,
          profile.achievements,
          profile.contributions,
          profile.last_updated, // Maps to 'created_at'
          profile.social_media_links,
          profile.bookings,
          null // Placeholder for experience if needed
        );
      });

      stmt.finalize();
    });

    console.log('20 profiles have been inserted into the database.');
  } catch (error) {
    console.error('Error inserting profiles:', error);
  } finally {
    db.close();
  }
};

// Execute the function to insert profiles
insertProfiles();
