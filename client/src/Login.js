import React, { useState, useEffect } from "react";
import useLogin from "./Hooks/useLogin";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { login, error, isLoading, isSucc } = useLogin();
  // const [isSigned, setIsSigned] = useState(false);

  // const navigate = useNavigate();

  // const useEffect =
  //   (() => {
  //     if (isSucc) {
  //       setTimeout(() => {
  //         navigate("/attendance");
  //       }, 1500);
  //     }
  //   },
  //   [isSucc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSigned(false);
    login(email, pw);
    console.log(error);
  };

  // useEffect(() => {
  //   console.log(error);
  //   if (!error && error !== null) setIsSigned(true);
  //   else setIsSigned(false);
  // }, [error]);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Log In</h3>
      <label htmlFor="em">Email</label>
      <input
        type="email"
        id="em"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="pw">Password</label>
      <input
        type="password"
        id="pw"
        onChange={(e) => setPw(e.target.value)}
        value={pw}
      />
      <button disabled={isLoading} type="submit">
        Login
      </button>
      {error && (
        <div style={{ color: "red", margin: "10px", "font-weight": "900" }}>
          {error}
        </div>
      )}
      {isSucc && (
        <div style={{ color: "green", margin: "10px", "font-weight": "900" }}>
          Succesfuly logged in!
        </div>
      )}
      <Link to="/signup">
        Not yet registered? <span>Signup</span>
      </Link>
    </form>
  );
}

export default Login;
