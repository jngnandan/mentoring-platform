const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const gsmarena = require('gsmarena-api');
const { Database } = require("sqlite3").verbose();
const http = require('http');
const fs = require('fs');
const newsletterRoutes = require('./newsletter'); // Import the newsletter routes
const mysql = require("mysql");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dgcfly5zo',
  api_key: '176928181688396',
  api_secret: 'K5nDfwF7QFPLbhKxs8XqUwNgYAk'
});

const app = express();
const dbPath = path.join(__dirname, "mydatabase2.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Your other initialization code here...

    const DOMAIN = 'localhost'; // Replace
    const HOST = '0.0.0.0'; // Replace with your desired host
    const PORT = process.env.PORT || 3002;

    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, 'ssl/private.key')),
      cert: fs.readFileSync(path.join(__dirname, 'ssl/certificate.crt')),
    };

    // const server = https.createServer(httpsOptions, app);
    const server = http.createServer(app);

    
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Running in Docker at http://localhost:${PORT}/`);
    });
    
    

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

initializeDBAndServer();

app.use(cors());

app.use(express.json()); // For parsing JSON bodies

// Use newsletter routes
app.use('/newsletter', newsletterRoutes);

// Define your routes and other middleware here...


// Define your routes and other middleware here...


// ... Previous code ...



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

// Profiles

// Create a new profile
app.post("/profiles", async (req, res) => {
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
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profiles", async (req, res) => {
  try {
    const data = await db.all("SELECT * FROM profiles");

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profiles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await db.get("SELECT * FROM profiles WHERE id = ?", [id]);

    if (!data) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/profiles/:id", async (req, res) => {
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
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/profiles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run("DELETE FROM profiles WHERE id = ?", [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});