import React, { useState, useEffect } from "react";
import useLogin from "./Hooks/useLogin";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { login, error, isLoading, isSucc } = useLogin();
  // const [isSigned, setIsSigned] = useState(false);

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
      {error && <div>{error}</div>}
      {isSucc && <div>Succesfuly logged in!</div>}
    </form>
  );
}

export default Login;
