import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import NavigationMenu from "./NavigationMenu";
import axios from "axios";

const CaptchaTest = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("1");
  const [verificationResult, setVerificationResult] = useState("");
  const [buttonClickCount, setButtonClickCount] = useState(0); // משתנה לספירת הלחיצות
  const [buttonState, setButtonState] = useState(0); // משתנה שמתחיל ב-0 ומשתנה ל-1 לאחר לחיצה
  const [geminiResponse, setGeminiResponse] = useState(null); // לאחסון התשובה מגימיני
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [captchaSuccess, setCaptchaSuccess] = useState(null); // משתנה לרדיו בוטון


  // Google reCAPTCHA Site Key (תחליפי למפתח שלך)
  const RECAPTCHA_SITE_KEY = "6LfdW4QqAAAAADVsDtxwmOhFo3j9LI1oLeEvmbvb";

  // קריאה כשהמשתמש מסיים את מבחן ה-CAPTCHA
  const handleCaptchaChange = (token) => {
    console.log("Captcha token:", token);
    if (token) {
      setCaptchaToken(token);
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
      setCaptchaToken("");
    }
  };


//פונקציה עובדת עם חלונית קופצת לצילום מסך
  // const captureAndSendCaptcha = async () => {
  //   console.log("captureAndSendCaptcha");

  //   try {
  //     // בקשת הרשאה ללכידת המסך
  //     const stream = await navigator.mediaDevices.getDisplayMedia({
  //       video: { mediaSource: "screen" },
  //     });

  //     // יצירת אלמנט וידאו כדי לקבל את זרם המסך
  //     const video = document.createElement("video");
  //     video.srcObject = stream;
  //     await video.play();

  //     // הוספת השהיה של 2 שניות כדי לאפשר לחלון הבחירה להיעלם
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // יצירת canvas ולכידת המסך
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;

  //     const ctx = canvas.getContext("2d");
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     // עצירת הזרם כדי למנוע דליפת משאבים
  //     stream.getTracks().forEach((track) => track.stop());

  //     //לפי המידות של התמונה שגיפיטי סימן לי!!!
  //     // // הגדרת האזור לחיתוך (לפי פיקסלים)
  //     // const clipX = 250; // התחלת X
  //     // const clipY = 0; // התחלת Y
  //     // const clipWidth = 750; // רוחב החיתוך
  //     // const clipHeight = 800; // גובה החיתוך

  //     // הגדרת האזור לחיתוך (לפי פיקסלים)
  //     const clipX = 380; // התחלת X
  //     const clipY = 130; // התחלת Y
  //     const clipWidth = 510; // רוחב החיתוך
  //     const clipHeight = 820; // גובה החיתוך

  //     // יצירת canvas חדש לחיתוך
  //     const croppedCanvas = document.createElement("canvas");
  //     croppedCanvas.width = clipWidth;
  //     croppedCanvas.height = clipHeight;

  //     const croppedCtx = croppedCanvas.getContext("2d");
  //     croppedCtx.drawImage(
  //       canvas,
  //       clipX,
  //       clipY,
  //       clipWidth,
  //       clipHeight,
  //       0,
  //       0,
  //       clipWidth,
  //       clipHeight
  //     );


  //     // // המרת התמונה לנתון Base64
  //     // const imageData = canvas.toDataURL("image/png");

  //     // // הצגת התמונה שנלקחה (לצורך הדגמה)
  //     // const imageElement = document.createElement("img");
  //     // imageElement.src = imageData; // הגדרת מקור התמונה כנתון Base64 שהתקבל
  //     // document.body.appendChild(imageElement); // הוספת התמונה לדף

  //     // המרת התמונה החדשה לנתון Base64
  //     const croppedImageData1 = croppedCanvas.toDataURL("image/png");

  //     // הצגת התמונה שנחתכה (לצורך הדגמה)
  //     const croppedImageElement = document.createElement("img");
  //     croppedImageElement.src = croppedImageData1;
  //     document.body.appendChild(croppedImageElement);

  //     // const croppedImageData = croppedCanvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");

  //     const croppedImageData = croppedCanvas.toDataURL("image/jpeg", 0.7) // מקודדת תמונה ל-JPEG ודוחסת ל-70%
  //       .replace(/^data:image\/jpeg;base64,/, "");
  //     // העלאה לג'מיני
  //     // await analyzeCaptchaWithGemini(base64Data);
  //     setCroppedImageData(croppedImageData);

  //     const prompt = "There are squares in the image. Number the squares from left to right, top to bottom, and explain what is in each square. Then, identify which squares to select and tell me which numbered squares to choose.";
  //     // שליחת התמונה לשרת (אם יש צורך)
  //     // const response = await axios.post("http://localhost:5000/upload-captcha-image", { image: imageData });
  //     // console.log("Server response:", response.data);
  //     // alert(response.data.message || "Captcha image sent successfully!");

  //     // שליחת התמונה והפרומפט לשרת
  //     setLoading(true); // מצב טעינה
  //     setError(null); // איפוס שגיאות
  //     setGeminiResponse(null); // איפוס תוצאה



  //     try {

  //       const response = await axios.post("http://localhost:5000/analyzeCaptcha", {
  //         imageBase64: croppedImageData,
  //         prompt,
  //       });

  //       setLoading(false);

  //       if (response.data.success) {
  //         setGeminiResponse(response.data.data); // שמירת התשובה מגימיני
  //         console.log("Gemini Response:", response.data.data);
  //         console.log("response.data", response.data)
  //       } else {
  //         setError(response.data.message || "Failed to process captcha.");
  //       }
  //     } catch (error) {
  //       console.error("Error sending captcha to server:", error);
  //       setLoading(false);
  //       setError("An error occurred while processing the captcha.");
  //     }
  //   } catch (error) {
  //     console.error("Error capturing or sending captcha image:", error);
  //     setLoading(false);
  //     setError("An error occurred while capturing the captcha.");
  //   }

  // };

  //מצלם מסך אוטומטית בצד שרת
  const captureScreenshot = async () => {
    console.log("צילום מסך על ידי השרת");
    const url = "http://localhost:3000/"; // ה-URL שברצונך לצלם

    try {
      const response = await axios.post(
        "http://localhost:5000/screenshot/",
        { url }, // שליחת ה-URL לשרת
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log("Screenshot successfully captured and uploaded!");
        console.log("Response from server:", response.data.filePath);
        alert("Screenshot captured and uploaded successfully!");
        //זימון פונקציה ששולחת לג'מיני תמונה ופרומפט
        sendCaptchaAndPromptToGemini(response.data.filePath);
      } else {
        console.error("Error:", response.data.message);
        alert(`Failed to capture screenshot: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error sending request to server:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };
//פונקציה ששולחת לגמיני נתיב של תמונה ופרומפט ומקבלת תגובה
  const sendCaptchaAndPromptToGemini = async (filePath) => {
    console.log("sendCaptchaAndPromptToGemini");
    try {
      // שליחת התמונה והפרומפט לשרת
      setLoading(true); // מצב טעינה
      setError(null); // איפוס שגיאות
      setGeminiResponse(null); // איפוס תוצאה
      // const prompt1 =
      //   "There are squares in the image. Number the squares from left to right, top to bottom, and explain what is in each square. Then, identify which squares to select and tell me which numbered squares to choose.";
      //   const prompt = "There are nine or sixteen squres, explain what in each squre, and in which squre there is what the captcha asks to select";
      const prompt =
        "There are nine or sixteen squares arranged in rows. Number the squares from top to bottom, left to right, starting from 1. Explain what is in each square and specify which squares contain the item that appears after the words 'Select all the images of'. Finally, tell us which squares to select.";
      try {
        const response = await axios.post(
          "http://localhost:5000/analyzeCaptcha",
          {
            filePath,
            prompt,
          }
        );
        setLoading(false);

        if (response.data.success) {
          setGeminiResponse(response.data.data); // שמירת התשובה מגימיני
          console.log("Gemini Response:", response.data.data);
          console.log("response.data", response.data);
        } else {
          setError(response.data.message || "Failed to process captcha.");
        }
      } catch (error) {
        console.error("Error sending captcha to server:", error);
        setLoading(false);
        setError("An error occurred while processing the captcha.");
      }
    } catch (error) {
      console.error("Error capturing or sending captcha image:", error);
      setLoading(false);
      setError("An error occurred while capturing the captcha.");
    }
  };


  //קשור לכפתור של הקפצ'ה הצליח / לא הצליח
  const handleSaveResult = async () => {
    if (captchaSuccess === null) {
      alert("Please select whether the CAPTCHA was successful or not.");
      return;
    }

    try {
      const payload = {
        captchaSuccess,
        geminiResponse,
        croppedImageData,
      };

      const response = await axios.post("http://localhost:5000/captchaData", payload);

      if (response.data.success) {
        alert("Result saved successfully!");
      } else {
        alert("Failed to save the result.");
      }
    } catch (error) {
      console.error("Error saving the result:", error);
      alert("An error occurred while saving the result.");
    }
  };


  const handleSendCaptcha = async () => {
    try {
      setButtonClickCount((prevCount) => prevCount + 1); // הגדלת מספר הלחיצות
      if (buttonState === 0) {
        setButtonState(1); // עדכון המצב ל-1 לאחר הלחיצה הראשונה
      }

      // פרמטרים לשליחה
      const data = {
        verified: true, // or the value you're expecting here
        token: "abc123", // the token value that should be passed
      };

      // בקשת POST לשרת
      const response = await axios.post(
        "http://localhost:5000/pictureTest",
        data
      );

      console.log(response.data.success);

      if (response.data.success) {
        alert("Captcha saved successfully!");
      } else {
        alert("Failed to save captcha. Try again.");
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      alert(
        "Error occurred while sending data. Check the console for details."
      );
    }
  };

  // שליחת הטוקן לשרת לבדיקה
  const handleSubmit = async () => {
    try {
      if (!captchaToken) {
        alert("Please complete the CAPTCHA!");
        return;
      }
      console.log("before");
      const response = await axios.post(
        "http://localhost:5000/verify-captcha",
        {
          token: captchaToken,
        }
      );
      console.log("after");

      setVerificationResult(
        response.data.success ? "CAPTCHA Verified!" : "CAPTCHA Failed!"
      );
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
      setVerificationResult("Verification failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "114px" }}>
      <NavigationMenu />
      <h1>Google reCAPTCHA V2 Demo</h1>
      <p>Complete the CAPTCHA below:</p>
      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
      <button
        onClick={handleSubmit}
        // disabled={!captchaVerified}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          // cursor: captchaVerified ? "pointer" : "not-allowed",
          backgroundColor: captchaVerified ? "blue" : "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Next Page
      </button>
      <button
        onClick={handleSendCaptcha} // קריאה לפונקציה שמטפלת בלחיצה
        // disabled={!captchaVerified}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          // cursor: captchaVerified ? "pointer" : "not-allowed",
          backgroundColor: captchaVerified ? "blue" : "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        כפתור זמני!!
      </button>
      <button
        onClick={() => {
          setTimeout(() => {
          //  captureAndSendCaptcha();
          captureScreenshot();
          }, 3000); // הפעלה לאחר 2 שניות
        }}

        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: captchaVerified ? "blue" : "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      // disabled={!captchaVerified || loading}
      >
        {loading ? "Processing..." : "Send Captcha to Gemini AI"}
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Processing the captcha...</p>}
      {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}
      {geminiResponse && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
          <h3>Gemini Response:</h3>
          <p>{geminiResponse}</p>
        </div>
      )}

      {verificationResult && (
        <p style={{ marginTop: "20px" }}>{verificationResult}</p>
      )}
      <p>Button clicked: {buttonClickCount} times</p> {/* הצגת מספר הלחיצות */}
      {/*הוספה שקשורה להצליח לא הצליח*/}
      <div style={{ marginTop: "20px" }}>
        <p>Was the CAPTCHA successful?</p>
        <label>
          <input
            type="radio"
            value="true"
            checked={captchaSuccess === true}
            onChange={() => setCaptchaSuccess(true)}
          />
          Yes
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            value="false"
            checked={captchaSuccess === false}
            onChange={() => setCaptchaSuccess(false)}
          />
          No
        </label>
        <br />
        <button onClick={handleSaveResult} style={{ marginTop: "10px" }}>
          Submit Result
        </button>
      </div>

    </div>
  );
};

export default CaptchaTest;
// import React, { useState, useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import axios from "axios";

// const App = () => {
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const [captchaToken, setCaptchaToken] = useState("");
//   const [verificationResult, setVerificationResult] = useState("");

//   // Google reCAPTCHA Site Key (תחליפי למפתח שלך)
//   const RECAPTCHA_SITE_KEY = "6LfdW4QqAAAAADVsDtxwmOhFo3j9LI1oLeEvmbvb";

//   // מעקב אחרי כישלונות CAPTCHA
//   useEffect(() => {
//     const observer = new MutationObserver((mutationsList) => {
//       for (let mutation of mutationsList) {
//         if (
//           mutation.type === "childList" &&
//           mutation.target.innerText.includes("נסה שוב")
//         ) {
//           console.log("User failed CAPTCHA attempt!");
//           // שליחת הניסיון הכושל לשרת
//           axios.post("http://localhost:5000/track-failed-captcha", {
//             event: "failed_attempt",
//           }).then(() => {
//             console.log("Failed attempt logged successfully.");
//           }).catch((error) => {
//             console.error("Error logging failed attempt:", error);
//           });
//         }
//       }
//     });

//     // מציאת האלמנט של ה-CAPTCHA ב-DOM
//     const captchaContainer = document.querySelector(".g-recaptcha");
//     if (captchaContainer) {
//       observer.observe(captchaContainer, {
//         childList: true,
//         subtree: true,
//       });
//     }

//     // ניקוי ה-observer
//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   // קריאה כשהמשתמש מסיים את מבחן ה-CAPTCHA
//   const handleCaptchaChange = (token) => {
//     console.log("Captcha token:", token);
//     if (token) {
//       setCaptchaToken(token);
//       setCaptchaVerified(true);
//     }
//     // else {
//     //   setCaptchaVerified(false);
//     //   setCaptchaToken("");
//     // }
//   };

//   // שליחת הטוקן לשרת לבדיקה
//   const handleSubmit = async () => {
//     try {
//       if (!captchaToken) {
//         alert("Please complete the CAPTCHA!");
//         return;
//       }

//       const response = await axios.post("http://localhost:5000/verify-captcha", {
//         token: captchaToken,
//       });

//       setVerificationResult(response.data.success ? "CAPTCHA Verified!" : "CAPTCHA Failed!");
//     } catch (error) {
//       console.error("Error verifying CAPTCHA:", error);
//       setVerificationResult("Verification failed. Please try again.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Google reCAPTCHA V2 Demo</h1>
//       <p>Complete the CAPTCHA below:</p>
//       <ReCAPTCHA
//         sitekey={RECAPTCHA_SITE_KEY}
//         onChange={handleCaptchaChange}
//       />
//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: captchaVerified ? "blue" : "gray",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         Next Page
//       </button>
//       <button
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: captchaVerified ? "blue" : "gray",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         Send CAPTCHA to Gemini AI
//       </button>
//       {verificationResult && <p style={{ marginTop: "20px" }}>{verificationResult}</p>}
//     </div>
//   );
// };

// export default App;


//גירסה 1
// const captureAndSendCaptcha = async () => {
//   console.log("captureAndSendCaptcha");

//   try {
//     // הגדרת המידות של אזור הצילום
//     const x = 50; // מיקום X (התחלה מ-50 פיקסלים מהקצה השמאלי של הדף)
//     const y = 100; // מיקום Y (התחלה מ-100 פיקסלים מהקצה העליון של הדף)
//     const width = 800; // רוחב אזור הצילום (400 פיקסלים)
//     const height = 400; // גובה אזור הצילום (200 פיקסלים)


//     // צילום מסך של אזור מדויק בעמוד
//     const canvas = await html2canvas(document.body);

//     // , {
//     //   x: x, // מיקום הצילום בציר X
//     //   y: y, // מיקום הצילום בציר Y
//     //   width: width, // רוחב הצילום
//     //   height: height, // גובה הצילום
//     // }
//     console.log("canvas");
//     console.log(canvas);
//     const imageData = canvas.toDataURL("image/png"); // המרת ה-canvas לתמונה בפורמט Base64

//     // הצגת התמונה שנלקחה (לצורך הדגמה)
//     const imageElement = document.createElement("img");
//     imageElement.src = imageData; // הגדרת מקור התמונה כנתון Base64 שהתקבל
//     document.body.appendChild(imageElement); // הוספת התמונה לדף

//     // שליחת התמונה לשרת (במידת הצורך)
//     // const response = await axios.post(
//     //   "http://localhost:5000/upload-captcha-image",
//     //   {
//     //     image: imageData,
//     //   }
//     // );

//     // console.log("Server response:", response.data);
//     // alert(response.data.message || "Captcha image sent successfully!");
//   } catch (error) {
//     console.error("Error capturing or sending captcha image:", error);
//     alert("An error occurred. Please check the console for details.");
//   }
// };

//גירסה 2
// const captureScreenshot = async () => {
//   const url = "http://localhost:3000/"; // ה-URL שברצונך לצלם

//   try {
//     const response = await axios.post(
//       "http://localhost:5000/screenshot/",
//       { url }, // שליחת ה-URL לשרת
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.data.success) {
//       console.log("Screenshot successfully captured and uploaded!");
//       console.log("Response from server:", response.data.geminiResponse);
//       alert("Screenshot captured and uploaded successfully!");
//     } else {
//       console.error("Error:", response.data.message);
//       alert(`Failed to capture screenshot: ${response.data.message}`);
//     }
//   } catch (error) {
//     console.error("Error sending request to server:", error);
//     alert("An error occurred. Please check the console for details.");
//   }
// };