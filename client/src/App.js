import "./App.css";
import Sgpa from "./Components/SGPA/Sgpa";
import Cgpa from "./Components/CGPA/Cgpa";
import Navbar from "./Navbar";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Attendance from "./Components/Attendance/Attendance";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import { useAuthContext } from "./Hooks/AuthContext";
import { useState } from "react";

function App() {
  const { state } = useAuthContext();
  const [allInfo, setAllInfo] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navbar setAllInfo={setAllInfo} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sgpa-calculator" element={<Sgpa />} />
          <Route path="/cgpa-calculator" element={<Cgpa />} />
          <Route
            path="/attendance"
            element={
              state.user ? (
                <Attendance setAllInfo={setAllInfo} allInfo={allInfo} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/signup"
            element={!state.user ? <Signup /> : <Navigate to="/attendance" />}
          />
          <Route
            path="/login"
            element={!state.user ? <Login /> : <Navigate to="/attendance" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
