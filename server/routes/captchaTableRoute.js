const express = require("express");
const router = express.Router();
const { getCaptchaResults } = require("../controllers/captchaTableController");

// נתיב לשליפת כל התוצאות
//router.get("/", getCaptchaResults);

router.get("/", (req, res, next) => {
    console.log("GET request received at /api/captcha/verify");
    next(); // ממשיכים לפונקציה הבאה (verifyCaptcha)
  }, getCaptchaResults);


module.exports = router;
