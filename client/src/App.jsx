import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CaptchaTest from "./CaptchaTest";
import CaptchaTable from "./CaptchaTable";


const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/captchaTest" />} />
      <Route path="/captchaTest" element={<CaptchaTest />} />
      <Route path="/captchaTable" element={<CaptchaTable />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;