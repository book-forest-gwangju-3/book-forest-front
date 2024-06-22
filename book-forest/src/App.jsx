import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookRecommendation from "./pages/BookRecommendation";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Tier from "./pages/Tier";
import Report from "./pages/Report";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tier" element={<Tier />} />
        <Route path="/report" element={<Report />} />
        <Route path="/bookRecommendation" element={<BookRecommendation />} />
      </Routes>
    </div>
  );
}

export default App;
