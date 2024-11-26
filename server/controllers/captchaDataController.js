const CaptchaResult = require("../models/captchaDataModel");

const saveCaptchaResult = async (req, res) => {
  const { captchaSuccess, geminiResponse, croppedImageData } = req.body;

  if (!croppedImageData || geminiResponse === null || captchaSuccess === null) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  try {
    const newResult = new CaptchaResult({
      captchaSuccess,
      geminiResponse,
      croppedImageData,
    });

    await newResult.save();
    res.status(200).json({ success: true, message: "Result saved successfully" });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ success: false, message: "Error saving result" });
  }
};

module.exports = { saveCaptchaResult };
