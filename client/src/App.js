import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import html2canvas from "html2canvas";
import axios from "axios";

const App = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("1");
  const [verificationResult, setVerificationResult] = useState("");
  const [buttonClickCount, setButtonClickCount] = useState(0); // משתנה לספירת הלחיצות
  const [buttonState, setButtonState] = useState(0); // משתנה שמתחיל ב-0 ומשתנה ל-1 לאחר לחיצה

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

  const captureAndSendCaptcha = async () => {
    console.log("captureAndSendCaptcha");
  
    try {
      // בקשת הרשאה ללכידת המסך
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });
  
      // יצירת אלמנט וידאו כדי לקבל את זרם המסך
      const video = document.createElement("video");
      video.srcObject = stream;
  
      await video.play();
  
      // הוספת השהיה של 2 שניות כדי לאפשר לחלון הבחירה להיעלם
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // יצירת canvas ולכידת המסך
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // עצירת הזרם כדי למנוע דליפת משאבים
      stream.getTracks().forEach((track) => track.stop());
  
      // המרת התמונה לנתון Base64
      const imageData = canvas.toDataURL("image/png");
  
      // הצגת התמונה שנלקחה (לצורך הדגמה)
      const imageElement = document.createElement("img");
      imageElement.src = imageData; // הגדרת מקור התמונה כנתון Base64 שהתקבל
      document.body.appendChild(imageElement); // הוספת התמונה לדף
  
      // שליחת התמונה לשרת (אם יש צורך)
      // const response = await axios.post("http://localhost:5000/upload-captcha-image", { image: imageData });
      // console.log("Server response:", response.data);
      // alert(response.data.message || "Captcha image sent successfully!");
    } catch (error) {
      console.error("Error capturing or sending captcha image:", error);
      alert("An error occurred. Please check the console for details.");
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
        Send Captcha to Gemini AI
      </button>
      <button
        onClick={() => {
          setTimeout(() => {
            captureAndSendCaptcha();
          }, 10000); // הפעלה לאחר 2 שניות
        }}
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
        captureAndSendCaptcha
      </button>
      {verificationResult && (
        <p style={{ marginTop: "20px" }}>{verificationResult}</p>
      )}
      <p>Button clicked: {buttonClickCount} times</p> {/* הצגת מספר הלחיצות */}
    </div>
  );
};

export default App;
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
