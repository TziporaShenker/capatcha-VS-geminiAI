const screenshot = require("screenshot-desktop");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const captureAndUpload = async (req, res) => {
  console.log("Starting screenshot process...");
  try {
    // 1. צילום מסך של כל המסך
    const img = await screenshot();
    console.log("Screenshot captured!");

    // 2. הגדרת נתיב לשמירת התמונה החתוכה
    const croppedImagePath = path.join(
      __dirname,
      "../screenshots",
      `cropped-screenshot-${Date.now()}.png`
    );

    // 3. יצירת תיקייה במידת הצורך
    const dir = path.dirname(croppedImagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 4. חיתוך התמונה ושמירה ישירות כקובץ פיזי
    const clipX = 500; // התחלת X
    const clipY = 150; // התחלת Y
    const clipWidth = 600; // רוחב החיתוך
    const clipHeight = 860; // גובה החיתוך

    // // 4. חיתוך התמונה ושמירה ישירות כקובץ פיזי
    // const clipX = 380; // התחלת X
    // const clipY = 120; // התחלת Y
    // const clipWidth = 550; // רוחב החיתוך
    // const clipHeight = 800; // גובה החיתוך
    
    await sharp(img)
      .extract({
        left: clipX,
        top: clipY,
        width: clipWidth,
        height: clipHeight,
      })
      .toFile(croppedImagePath);

    console.log("Cropped image saved locally!");

    // 5. החזרת תגובה ללקוח
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