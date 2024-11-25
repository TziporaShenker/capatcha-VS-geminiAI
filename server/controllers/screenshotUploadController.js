const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const captureAndUpload = async (req, res) => {

    let browser;

    const { url, clip } = req.body; // `clip` הוא אובייקט שמכיל את הנתונים של x, y, width, height
    // if (!url) {
    //     return res.status(400).json({ success: false, message: "URL is required" });

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // השהיה של 4 שניות
        await new Promise((resolve) => setTimeout(resolve, 4000));

        // // צילום מסך
        // let screenshot;
        // if (clip) {
        //     screenshot = await page.screenshot({
        //         type: "png",
        //         clip: {
        //             x: clip.x,
        //             y: clip.y,
        //             width: clip.width,
        //             height: clip.height,
        //         },
        //     });
        // } else {
        //     screenshot = await page.screenshot({ type: "png", fullPage: true });
        // }

        screenshot = await page.screenshot({ type: "png", fullPage: true });

        // שמירה או שליחה של התמונה
        const screenshotPath = path.join(
            __dirname,
            "../screenshots",
            `screenshot-${Date.now()}.png`
        );
        const dir = path.dirname(screenshotPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(screenshotPath, screenshot);

        res.json({
            success: true,
            message: "Screenshot captured successfully!",
        });
    } catch (error) {
        console.error("Error capturing screenshot:", error);
        res.status(500).json({ success: false, message: "Server error" });
    } finally {
        if (browser) {
            await browser.close();
        }
    }

};

module.exports = { captureAndUpload };
// const puppeteer = require("puppeteer");
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");

// const captureAndUpload = async (req, res) => {
//   let browser;
//   try {
//     const { url } = req.body;
//     if (!url) {
//       return res.status(400).json({ success: false, message: "URL is required" });
//     }

//     // הפעלת Puppeteer
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: "networkidle2" });

//     // הגדרת גודל התצוגה
//     await page.setViewport({
//       width: 1920,
//       height: 1080,
//     });

//     // המתנה לטעינת iframe המכיל את ה-Captcha
//     const iframeElement = await page.waitForSelector("iframe"); // החלף בסלקטור המתאים אם ידוע
//     const frame = await iframeElement.contentFrame();

//     if (!frame) {
//       throw new Error("Failed to access the iframe content.");
//     }

//     // המתנה לטעינת רכיב ה-Captcha בתוך ה-iframe
//     await frame.waitForSelector("#captcha-element-id", { visible: true }); // החלף את `#captcha-element-id` בסלקטור המתאים של רכיב ה-Captcha

//     // צילום מסך של כל הדף (כולל ה-Captcha)
//     const screenshot = await page.screenshot({
//       fullPage: true,
//       type: "png",
//     });

//     // שמירת הקובץ
//     const screenshotPath = path.join(
//       __dirname,
//       "../screenshots",
//       `screenshot-${Date.now()}.png`
//     );
//     const dir = path.dirname(screenshotPath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     fs.writeFileSync(screenshotPath, screenshot);

//     res.json({
//       success: true,
//       message: "Screenshot captured successfully!",
//       path: screenshotPath,
//     });
//   } catch (error) {
//     console.error("Error capturing screenshot:", error);
//     res.status(500).json({ success: false, message: error.message || "Server error" });
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// };

// module.exports = { captureAndUpload };
