const mongoose = require("mongoose");

const CaptchaResultSchema = new mongoose.Schema({
  captchaSuccess: { type: Boolean, required: true },
  geminiResponse: { type: String, required: true },
  croppedImageData: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("CaptchaResult", CaptchaResultSchema);
