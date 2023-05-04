const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//import routes

const authRoutes = require("./routes/auth");
// Load environment variables from .env file
dotenv.config();

// Create Express.js server
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB database:", err.message);
  });

// Define API endpoints
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start server
const port = process.env.PORT || 5000;
app.use("/api/auth/", authRoutes);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});