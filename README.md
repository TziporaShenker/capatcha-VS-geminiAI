# 🤖 CAPTCHA vs Gemini AI

Can AI defeat Google's **reCAPTCHA** challenge?  
This project explores whether **Gemini AI**, Google's latest artificial intelligence model, can successfully solve reCAPTCHA V2 tests — and the results are *surprisingly impressive*! 🚀

---

## 📌 Overview
CAPTCHA (**C**ompletely **A**utomated **P**ublic **T**uring test to tell **C**omputers and **H**umans **A**part) is a widely used challenge-response test designed to differentiate between humans and bots.  

In this project, we put Gemini AI to the test against Google’s reCAPTCHA to see if an advanced AI model can break through one of the most popular web security measures.

With a **~90% success rate on the very first attempt**, this experiment raises big questions about the future of reCAPTCHA technology.

---

## ⚙️ Tech Stack

**Client:**  
- React  
- Material-UI  
- Google reCAPTCHA integration  

**Server:**  
- Node.js  
- Gemini AI API integration  

**Database:**  
- MongoDB Atlas (cloud-based, scalable, reliable)

---

## 🔬 How It Works
1. **Challenge Presentation**: reCAPTCHA V2 is displayed to the user.  
2. **Smart Analysis**: Captured challenge data is sent to Gemini AI for intelligent processing.  
3. **User Interaction**: The user submits an answer (success or failure).  
4. **Data Storage**: Results are securely stored in MongoDB Atlas.  
5. **Statistics**: The system analyzes and visualizes the data, showing success rates and stored attempts.

---

## 📊 Results
- **Success Rate:** ~90% on the first try  
- **Insight:** Gemini AI demonstrates significant ability to bypass CAPTCHA, questioning the long-term reliability of reCAPTCHA V2.  

---

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/your-username/captcha-vs-gemini.git
cd captcha-vs-gemini
npm install

### Run the project
- **Client:**
```bash
cd client
npm start
- **Server:**
cd server
npm start


