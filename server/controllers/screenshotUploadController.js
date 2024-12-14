require("dotenv").config();
const screenshot = require("screenshot-desktop");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const captureAndUpload = async (req, res) => {
  console.log("Starting screenshot process...");
  try {
    // 1. Capture a screenshot of the entire desktop
    const img = await screenshot();

    // 2. Define the path to save the cropped image
    const croppedImagePath = path.join(
      __dirname,
      "../screenshots",
      `cropped-screenshot-${Date.now()}.png`
    );

    // 3. Create the directory if it doesn't exist
    const dir = path.dirname(croppedImagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 4. Crop the screenshot based on environment variables and save it
    await sharp(img)
      .extract({
        left: Number(process.env.CLIP_X),
        top: Number(process.env.CLIP_Y),
        width: Number(process.env.CLIP_WIDTH),
        height: Number(process.env.CLIP_HEIGHT),
      })
      .toFile(croppedImagePath);

    console.log("Cropped image saved locally!");

    // 5. Send a response back to the client with the cropped image details
    res.json({
      success: true,
      message: "Screenshot captured, cropped, and saved successfully!",
      filePath: croppedImagePath,
    });
  } catch (error) {
    console.error("Error capturing or processing screenshot:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { captureAndUpload };
