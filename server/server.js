// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();

// // Google reCAPTCHA Secret Key (תחליפי למפתח שלך)
// const RECAPTCHA_SECRET_KEY = "6LfdW4QqAAAAAJ5zDmHwq-xu5P9-nrhfMPYyW2vM";

// // הגדרות בינאריות
// app.use(cors());
// app.use(bodyParser.json());

// // נתיב לאימות ה-CAPTCHA
// app.post("/verify-captcha", async (req, res) => {
//   // alert("Received request to verify CAPTCHA");

//   const { token } = req.body;

//   if (!token) {
//     return res
//       .status(400)
//       .json({ success: false, message: "No token provided" });
//   }

//   try {
//     // שליחת הטוקן ל-Google
//     const response = await axios.post(
//       `https://www.google.com/recaptcha/api/siteverify`,
//       null,
//       {
//         params: {
//           secret: RECAPTCHA_SECRET_KEY,
//           response: token,
//         },
//       }
//     );

//     const { success } = response.data;

//     if (success) {
//       return res.json({
//         success: true,
//         message: "CAPTCHA verified successfully",
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "CAPTCHA verification failed",
//       });
//     }
//   } catch (error) {
//     console.error("Error verifying CAPTCHA:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // app.post("/track-failed-captcha", (req, res) => {
// //   console.log("Failed CAPTCHA attempt recorded!");
// //   res.status(200).send({ success: true });
// // });

// // הפעלת השרת
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");

// חיבור למסד נתונים
connectDB();

// ייבוא הנתיבים
const captchaRoute = require("./routes/captchaRoute");
const pictureTestRoute = require("./routes/pictureTestRoute");
const screenshotUploadRoute = require("./routes/screenshotUploadRoute");


const app = express();

// הגדרות בינאריות
app.use(cors());
app.use(bodyParser.json());

// שימוש בנתיבים
// app.use("/verify-captcha", captchaRoute);
app.use("/pictureTest", pictureTestRoute);
// app.use("/screenshot", screenshotUploadRoute);
// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
