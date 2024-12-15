require("dotenv").config();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Function to convert a Base64 string to the format expected by the Google Generative AI API
function base64ToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data, // The Base64 data of the image
      mimeType, // The MIME type of the image (e.g., "image/png")
    },
  };
}

// Initialize the Google Generative AI client using the API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Specify the model to use (Gemini 1.5 Flash)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to analyze a CAPTCHA image using Gemini
async function analyzeCaptchaWithGemini(filePath, prompt) {
  console.log("analyzeCaptchaWithGemini", filePath, prompt);
  try {
    // Read the image file from the given path and convert it to a Base64 string
    const base64Image = Buffer.from(fs.readFileSync(filePath)).toString(
      "base64"
    );

    // Prepare the image data for the Gemini API
    const imagePart = base64ToGenerativePart(base64Image, "image/png");

    // Default prompt in case no prompt is provided by the client
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

    // Send the prompt and image data to Gemini for processing
    const result = await model.generateContent([ prompt || defaultPrompt, imagePart]);
    
    // Return the generated response text
    return result.response.text();
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Function to analyze boolean success/failure data using Gemini
const analyzeDataWithGemini = async (successData, prompt) => {
  try {
    // Default prompt in case no prompt is provided by the client
    const defaultPrompt = `
      Analyze the following dataset, which contains boolean values indicating success (true) or failure (false). 
      Calculate the percentage of successes and failures, and summarize the results.

      Data: ${JSON.stringify(successData)}
    `;

    // Send the prompt and data to Gemini for processing
    const geminiResponse = await model.generateContent([
      prompt || defaultPrompt,
    ]);

    // Return the generated response text
    return geminiResponse.response.text();
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Export the functions for external usage
module.exports = { analyzeCaptchaWithGemini, analyzeDataWithGemini };
