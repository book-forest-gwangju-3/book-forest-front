import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookRecommendation from "./pages/BookRecommendation";
import BookDetail from "./pages/BookDetail";
import BookSearch from "./pages/BookSearch";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Tier from "./pages/Tier";
import Report from "./pages/Report";
import ReportDetail from "./pages/ReportDetail";
import ReportEditor from "./pages/ReportEditor";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div>
      <Header />
      <div style={{ width: "1200px", margin: "0 auto" }}>
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tier" element={<Tier />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/report/editor" element={<ReportEditor />} />
          <Route path="/report/editor/:id" element={<ReportEditor />} />
          <Route path="/book-recommendation" element={<BookRecommendation />} />
          <Route path="/book/search" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
