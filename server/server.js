const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect to the database
connectDB();

// Importing route handlers
const pictureTestRoute = require("./routes/pictureTestRoute");
const screenshotUploadRoute = require("./routes/screenshotUploadRoute");
const imageProcessingRoute = require("./routes/imageProcessingRoute");
const captchaData = require("./routes/captchaDataRoute");
const captchaTableRoute = require("./routes/captchaTableRoute");
const analyzeData = require("./routes/analyzeDataRoute");

const app = express();

// Middleware configurations
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies for requests
app.use(express.json({ limit: "10mb" })); // Set JSON size limit for requests
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Set URL-encoded data size limit
const path = require("path");

// Route handlers for various functionalities
app.use("/pictureTest", pictureTestRoute);
app.use("/analyzeCaptcha", imageProcessingRoute);
app.use("/captchaData", captchaData);
app.use("/screenshot", screenshotUploadRoute);
app.use("/captchaTable", captchaTableRoute);
app.use("/analyzeData", analyzeData);
app.use("/screenshots", express.static(path.join(__dirname, "screenshots")));

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
