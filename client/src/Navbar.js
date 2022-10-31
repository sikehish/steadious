import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "./Hooks/useLogout";
import { useAuthContext } from "./Hooks/AuthContext";
import logo from "./favicon_io/android-chrome-192x192.png";
import "./Navbar.css";

function Navbar({ setAllInfo }) {
  const navigate = useNavigate();

  const logout = useLogout();

  const { state } = useAuthContext();
  console.log(state);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    if (state.user === null && !state.flag) navigate("/");
    setAllInfo([]);
  };

  return (
    <nav className="py-4 navbar">
      <div className="flex mx-4  justify-around items-center text-violet-900 font-semibold">
        <Link to="/">
          <img src={logo} className="h-20" alt="" />
        </Link>
        <Link
          to="/sgpa-calculator"
          className="mx-2 font-sans focus:text-violet-700  hover:font-extrabold"
          // style={{ "font-family": "poppins" }}
        >
          SGPA Calculator
        </Link>
        <Link to="/cgpa-calculator" className="mx-2 hover:font-extrabold">
          CGPA Calculator
        </Link>
        <Link to="/attendance" className="mx-2 hover:font-extrabold">
          Attendance
        </Link>
        {state.user && (
          <div className="nav-logout">
            <h3>{state.user.email}</h3>
            <button
              onClick={handleLogout}
              className="mx-2 hover:font-extrabold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
