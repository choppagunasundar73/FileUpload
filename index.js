/**
 * Application entry point
 * This module initializes the Express application, connects to the database,
 * configures middleware, and sets up routes.
 */

// Import dependencies
const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const db = require("./config/database");
const cloudinary = require("./config/cloudinary");
const uploadRoutes = require("./routes/fileUpload");

// Initialize Express application
const app = express();

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to handle file uploads
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));

// Connect to the database
db.connect();

// Connect to Cloudinary
cloudinary.cloudinaryConnect();

// Set up routes
app.use('/api/v1/upload', uploadRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});
