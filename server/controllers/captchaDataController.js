const CaptchaResult = require("../models/captchaDataModel");

const saveCaptchaResult = async (req, res) => {
  const { filePath, prompt, geminiResponse, isCaptchaSuccessful } = req.body;

  if (
    filePath === null ||
    geminiResponse === null ||
    isCaptchaSuccessful === null
  ) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }
// קביעת ערך ברירת מחדל ל-prompt אם הוא ריק או לא הועבר
const defaultPrompt = `
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
      `;
  try {
    const newResult = new CaptchaResult({
      filePath,
      prompt: prompt || defaultPrompt,
      geminiResponse,
      isCaptchaSuccessful,
    });
    
    await newResult.save();
    res
      .status(200)
      .json({ success: true, message: "Result saved successfully" });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ success: false, message: "Error saving result" });
  }
};

module.exports = { saveCaptchaResult };