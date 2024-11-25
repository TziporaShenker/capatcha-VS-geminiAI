require("dotenv").config();
//const fs = require("fs");
//const readline = require("readline");

const { GoogleGenerativeAI } = require("@google/generative-ai"); // Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";

// פונקציה לשימוש בקובץ Base64 במקום קובץ פיזי
function base64ToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

async function analyzeCaptchaWithGemini(base64Image,prompt) {
  console.log("analyzeCaptchaWithGemini")
    // // Make sure to include these imports:
    // // import { GoogleGenerativeAI } from "@google/generative-ai";
    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    // function fileToGenerativePart(path, mimeType) {
    //   return {
    //     inlineData: {
    //       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
    //       mimeType,
    //     },
    //   };
    // }
    // const prompt = "There are squres, explain what in each squre, and in which squre there is what the captcha asks to select";
    // // const prompt = "There are nine squres, explain what in each squre, and in which squre there is crosswalks even a small one";
    // // const prompt = "There are nine squres, explain what in each squre, and in which squre there is bicycles";
    
    // // Note: The only accepted mime types are some image types, image/*.
    // const imagePart = fileToGenerativePart(`captcha.png`, "image/png");
    // // const imagePart = fileToGenerativePart(`captcha2.jpg`, "image/jpeg");
    // // const imagePart = fileToGenerativePart(`captcha3.jpg`, "image/jpeg");
  
    // const result = await model.generateContent([prompt, imagePart]);
    // console.log(result.response.text());
    try {
      // יצירת אובייקט Google Generative AI
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
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
