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

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function analyzeCaptchaWithGemini(filePath, prompt) {
  console.log("analyzeCaptchaWithGemini", filePath, prompt);
  try {
    // קריאת הקובץ מהנתיב והמרתו ל-Base64
    const base64Image = Buffer.from(fs.readFileSync(filePath)).toString(
      "base64"
    );

    // הגדרת חלק התמונה
    const imagePart = base64ToGenerativePart(base64Image, "image/png");

    // אם לא נשלח פרומפט מהלקוח, יצירת ברירת מחדל
    const defaultPrompt =`
      The image is divided into squares, either 9 (3x3) or 16 (4x4), numbered from top-left to bottom-right. The numbering starts at 1 and proceeds row by row.
      
      Your task:
      1. Describe the content of each square briefly, like "tree", "road", "car".
      2. Identify all squares containing the target object (e.g., "traffic lights"), even if it is only partially visible.
      3. Clearly list the numbers of the squares to select.
      
      Answer in this exact format:
      Descriptions:
      Square 1: [description]
      Square 2: [description]
      ... (continue for all squares)
      
      Select: [list of square numbers containing the object]
      If the object is not present in any square, respond with: "No squares to select."
      ` ;

    // שליחת בקשה ל-Gemini
    const result = await model.generateContent([ prompt || defaultPrompt, imagePart]);
    
    // החזרת התוצאה כטקסט
    return result.response.text(); // החזרת הטקסט בלבד
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
}

const analyzeDataWithGemini = async (successData, prompt) => {
  try {
    // אם לא נשלח פרומפט מהלקוח, יצירת ברירת מחדל
    const defaultPrompt = `
      Analyze the following dataset, which contains boolean values indicating success (true) or failure (false). 
      Calculate the percentage of successes and failures, and summarize the results.

      Data: ${JSON.stringify(successData)}
    `;

    const geminiResponse = await model.generateContent([
      prompt || defaultPrompt,
    ]);

    // החזרת תשובה מג'מיני
    return geminiResponse.response.text();
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
};

module.exports = { analyzeCaptchaWithGemini, analyzeDataWithGemini };
