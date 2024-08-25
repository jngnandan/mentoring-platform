const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const gsmarena = require('gsmarena-api');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk'
});

const app = express();
const dbPath = path.join(__dirname, "mydatabase2.db");
let db = null;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
app.use(express.static(path.join(__dirname, 'public')));

// Add CSP middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:; connect-src 'self' https://www.googletagmanager.com;"
  );
  next();
});

// Function to fetch random user data from randomuser.me
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
    console.error('Error fetching random user data:', error);
    return null;
  }
};

// Main function to insert profiles into the database
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
    for (const profile of profiles) {
      await db.run(`
        INSERT INTO profiles (id, username, email, first_name, last_name, job_title, bio, company, profile_picture, hobbies, achievements, contributions, last_updated, social_media_links, bookings)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      ]);
    }
    console.log('20 profiles have been inserted into the database.');
  } catch (error) {
    console.error('Error inserting profiles:', error);
  }
};

// Define your routes
app.get('/test', (req, res) => {
  res.send('Test route is working');
});

app.post("/generate-profiles", async (req, res) => {
  console.log("Reached /generate-profiles route");
  try {
    await insertProfiles();
    res.status(201).json({ message: "20 profiles have been inserted into the database." });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profiles", async (req, res) => {
  try {
    const data = await db.all(`SELECT * FROM profiles`);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch mobiles from different brands
const createMobileRoute = (brand) => {
  app.get(`/${brand}`, async (req, res) => {
    try {
      const getDataQuery = `
        SELECT
          name,
          image_public_id,
          description,
          new_id,
          price
        FROM
          ${brand};
      `;

      const data = await db.all(getDataQuery);

      const transformedData = data.map((item) => ({
        name: item.name,
        img: cloudinary.url(item.image_public_id),
        description: item.description,
        new_id: item.new_id,
        price: item.price,
      }));

      res.json(transformedData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

// Create routes for different brands
const brands = ['apple', 'samsung', 'xiaomi', 'oneplus', 'google', 'motorola'];
brands.forEach(createMobileRoute);

// Route to fetch deals from GSM Arena
app.get("/", async (req, res) => {
  try {
    const deals = await gsmarena.deals.getDeals();
    res.json(deals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 middleware
app.use((req, res) => {
  console.log(`Received request for ${req.method} ${req.url}`);
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Initialize DB and server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    
    const PORT = process.env.PORT || 3002;
    const server = http.createServer(app);
    
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
      console.log('Registered routes:');
      app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
          console.log(r.route.path);
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

initializeDBAndServer();


// Define your routes and other middleware here...


// Define your routes and other middleware here...


// ... Previous code ...

// Global error handling middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' http://localhost:3002/;"
  );
  next();
});


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
      img: cloudinary.url(item.image_public_id),
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
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/mobiles/:brand", async (req, res) => {
  try {
    const { brand } = req.params;

    // Ensure that the brand name corresponds to an existing table
    const validBrands = ['apple', 'samsung', 'xiaomi', 'oneplus','google', 'motorola' /* add other valid brand names */];
    if (!validBrands.includes(brand.toLowerCase())) {
      return res.status(400).json({ error: "Invalid brand" });
    }

    const getDataByBrandQuery = `
      SELECT
        name,
        image_public_id,
        description,
        new_id,
        price
      FROM
        ${brand.toLowerCase()}  -- assuming the table names match the brand names
      ORDER BY
        brand;
    `;

    const data = await db.all(getDataByBrandQuery);

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
      brand: brand.toLowerCase(),
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.get("/apple", async (req, res) => {
  try {
    const tableName = "apple";
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

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.get("/samsung", async (req, res) => {
  try {
    const tableName = "samsung";
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

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/xiaomi", async (req, res) => {
  try {
    const tableName = "xiaomi";
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

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/oneplus", async (req, res) => {
  try {
    const tableName = "oneplus";
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

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/google", async (req, res) => {
  try {
    const tableName = "google";
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

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/motorola", async (req, res) => {
  try {
    const tableName = "motorola";
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

    const transformedData = data.map((item) => ({
      name: item.name,
      img: cloudinary.url(item.image_public_id),
      description: item.description,
      new_id: item.new_id,
      price: item.price,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    // Fetch deals from GSM Arena
    const deals = await gsmarena.deals.getDeals();
    res.json(deals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/mobiles", async (req, res) => {
//   try {
//     const tableName = "motorola";
//     const getDataQuery = `
//         SELECT
//           name,
//           image_public_id,
//           description,
//           new_id,
//           price
//         FROM
//           ${tableName};
//       `;

//     const data = await db.all(getDataQuery);

//     const transformedData = data.map((item) => ({
//       name: item.name,
//       img: cloudinary.url(item.image_public_id),
//       description: item.description,
//       new_id: item.new_id,
//       price: item.price,
//     }));

//     res.json(transformedData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// app.listen(3002, () => {
//   console.log("Server Running at https://localhost:3002/");
// });


// app.get("/products", async (req, res) => {
//   try {
//     const getMobilesQuery = `
//       SELECT
//         *
//       FROM
//         mobiles;
//     `;
//     const mobiles = await db.all(getMobilesQuery);
//     res.json(mobiles);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// app.get("/products", async (req, res) => {
//   try {
//     // Fetch deals from GSM Arena
//     const deals = await gsmarena.deals.getDeals();
//     res.json(deals);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/mobiles", async (req, res) => {
//   try {
//     // Fetch deals from GSM Arena
//     const devices = await gsmarena.catalog.getBrand('google-phones-107');
//     res.json(devices);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/brands", async (req, res) => {
//   try {
//     // Fetch deals from GSM Arena
//     const one = await gsmarena.catalog.getBrands();
//     res.json(one);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// app.get("/products/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params; // Extract the productId from the request parameters.
//     console.log(productId)
//     const device = await gsmarena.catalog.getDevice(productId);
//     console.log(device);
//     res.json(device);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// const cachedData = {};

// app.get("/products/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params;
//     console.log(productId);

//     if (cachedData[productId]) {
//       // If the data for this productId is already in the cache, return it
//       console.log("Data found in cache.");
//       return res.json(cachedData[productId]);
//     }

//     const device = await gsmarena.catalog.getDevice(productId);
//     console.log(device);

//     // Call initializePhonespecTable to create or update the table
//     await initializePhonespecTable(device);

//     // Cache the data for future use
//     cachedData[productId] = device;

//     res.json(device);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// async function initializePhonespecTable(device) {
//   try {
//     // You can call this function when you want to create or update the table
//     await 
//     createTableAndAddDataForPhonespec([device]); // Wrap the 'device' in an array for consistency with your existing code
//     console.log("Table created and data inserted into the database for phonespec.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }











// app.get("/new", async (req, res) => {
//   const searchTerm = 'apple iphone 14'; // Replace with the desired term
// try {
//   // const { productId } = req.params; // Extract the productId from the request parameters.
//   //     console.log(productId)
//   const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
//   console.log(device);
// } catch (error) {
//   console.error('Error:', error);
// }
// });







// const fetchDeviceDetails = async (id) => {
//   try {
//     const response = await axios.get(`/products/${id}`); // Adjust the URL as needed
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching device details:', error);
//     throw error;
//   }
// };





// // Import the gsmarena-scraper library
// const gsmarena = require('gsmarena-scraper');

// app.get('/catalog/:brand', async (req, res) => {
//   const { brand } = req.params;
//   try {
//     // Fetch mobile phones for the specified brand using the gsmarena.catalog library
//     const devices = await gsmarena.catalog.getBrand(brand);

//     // Check if the result is empty or null
//     if (!devices || devices.length === 0) {
//       res.status(404).json({ error: 'No data found for the specified brand' });
//     } else {
//       res.json(devices);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// Define an API route to get a list of all mobile phone brands
// app.get('/catelog', async (req, res) => {
//   try {
//     // Fetch all mobile phone brands using the gsmarena.catalog library
//     const brands = await gsmarena.catalog.getBrands();
//     res.json(brands);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
