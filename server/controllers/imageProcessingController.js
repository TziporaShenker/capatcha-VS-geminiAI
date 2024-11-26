// const { analyzeCaptchaWithGemini } = require("../geminiApi");

// const processImage = async (req, res) => {
//   try {
//     const { imageBase64, prompt } = req.body;

//     // העברת נתוני התמונה והפרומפט ל-Gemini API
//     const geminiResponse = await analyzeCaptchaWithGemini(imageBase64, prompt);

//     // החזרת התוצאה ללקוח
//     res.status(200).json({ success: true, data: geminiResponse });
//   } catch (error) {
//     console.error("Error processing image with Gemini API:", error);
//     res.status(500).json({ success: false, message: "Failed to process image" });
//   }
// };

// module.exports = { processImage };

const { analyzeCaptchaWithGemini } = require("../geminiApi");

const processImage = async (req, res) => {
  try {
    const { filePath, prompt } = req.body;

    // העברת נתוני התמונה והפרומפט ל-Gemini API
    const geminiResponse = await analyzeCaptchaWithGemini(filePath, prompt);

    // החזרת התוצאה ללקוח
    res.status(200).json({ success: true, data: geminiResponse });
  } catch (error) {
    console.error("Error processing image with Gemini API:", error);
    res.status(500).json({ success: false, message: "Failed to process image" });
  }
};

module.exports = { processImage };