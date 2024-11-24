const express = require("express");
const { verifyCaptcha } = require("../controllers/captchaController");

const router = express.Router();

// // נתיב לאימות ה-CAPTCHA
// router.post("/verify", verifyCaptcha);

// נתיב לאימות ה-CAPTCHA
router.post("/", (req, res, next) => {
    console.log("POST request received at /api/captcha/verify");
    next(); // ממשיכים לפונקציה הבאה (verifyCaptcha)
  }, verifyCaptcha);


module.exports = router;
