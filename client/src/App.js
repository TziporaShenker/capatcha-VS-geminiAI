import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
    } 
    else {
      setCaptchaVerified(false);
      setCaptchaToken("");
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
        verified: true,  // or the value you're expecting here
        token: 'abc123', // the token value that should be passed
      };
      
      // בקשת POST לשרת
      const response = await axios.post("http://localhost:5000/pictureTest", data);

      console.log(response.data.success);

      if (response.data.success) {
        alert("Captcha saved successfully!");
      } else {
        alert("Failed to save captcha. Try again.");
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      alert("Error occurred while sending data. Check the console for details.");
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
      const response = await axios.post("http://localhost:5000/verify-captcha", {
        token: captchaToken,
      });
      console.log("after");

      setVerificationResult(response.data.success ? "CAPTCHA Verified!" : "CAPTCHA Failed!");
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
      setVerificationResult("Verification failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Google reCAPTCHA V2 Demo</h1>
      <p>Complete the CAPTCHA below:</p>
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
      />
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
      {verificationResult && <p style={{ marginTop: "20px" }}>{verificationResult}</p>}
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
