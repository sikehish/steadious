import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "./Hooks/useSignup";

function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { signup, error, isLoading, isSucc } = useSignup();
  const navigate = useNavigate();
  // const [isSigned, setIsSigned] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, pw);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    // console.log(error);
    // if (error) setIsSigned(false);
    // else if (!error) setIsSigned(true);
  };

  // useEffect(() => {
  //   if (!error && pw && email) setIsSigned(true);
  //   else setIsSigned(false);
  // }, [error]);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Sign Up</h3>
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
        Sign Up
      </button>
      <div style={{ color: "red", margin: "10px", "font-weight": "900" }}>
        {error}
      </div>
      {isSucc && <div>Loading..</div>}
      <Link to="/login">
        Have an account? <span>Login</span>
      </Link>
    </form>
  );
}

export default SignUp;
