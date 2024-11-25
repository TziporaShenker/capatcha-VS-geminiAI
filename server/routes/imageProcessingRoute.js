// const express = require("express");
// const router = express.Router();
// const {processImage} = require("../controllers/imageProcessingController");

// // מסלול לעיבוד תמונה
// router.post("/", processImage);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { processImage } = require("../controllers/imageProcessingController");

// מסלול לעיבוד תמונה
router.post("/", (req, res, next) => {
  console.log("Route");
  next();  // עובר לקונטרולר לעיבוד התמונה
}, processImage);

module.exports = router;
