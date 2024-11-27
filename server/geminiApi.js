// require("dotenv").config();
// //const fs = require("fs");
// //const readline = require("readline");

// const { GoogleGenerativeAI } = require("@google/generative-ai"); // Make sure to include these imports:
// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // פונקציה לשימוש בקובץ Base64 במקום קובץ פיזי
// function base64ToGenerativePart(base64Data, mimeType) {
//   return {
//     inlineData: {
//       data: base64Data,
//       mimeType,
//     },
//   };
// }

// async function analyzeCaptchaWithGemini(base64Image,prompt) {
//   console.log("analyzeCaptchaWithGemini")
//     try {
//       // יצירת אובייקט Google Generative AI
//       const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
//       // הגדרת חלק התמונה
//       const imagePart = base64ToGenerativePart(base64Image, "image/png");
  
//       // שליחת בקשה ל-Gemini
//       const result = await model.generateContent([prompt, imagePart]);
  
//       // החזרת התוצאה כטקסט
//       return result.response.text(); // החזרת הטקסט בלבד
//     } catch (error) {
//       console.error("Error communicating with Gemini API:", error);
//       throw error;
//     }

//   }
//   module.exports = { analyzeCaptchaWithGemini };

require("dotenv").config();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// פונקציה לשימוש בקובץ Base64 במקום קובץ פיזי
function base64ToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

async function analyzeCaptchaWithGemini(filePath, prompt) {
  console.log("analyzeCaptchaWithGemini", filePath, prompt);
  try {
    // יצירת אובייקט Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // קריאת הקובץ מהנתיב והמרתו ל-Base64
    const base64Image = Buffer.from(fs.readFileSync(filePath)).toString("base64");

    // הגדרת חלק התמונה
    const imagePart = base64ToGenerativePart(base64Image, "image/png");

    // שליחת בקשה ל-Gemini
    const result = await model.generateContent([prompt, imagePart]);

    // החזרת התוצאה כטקסט
    return result.response.text(); // החזרת הטקסט בלבד
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
}

module.exports = { analyzeCaptchaWithGemini };