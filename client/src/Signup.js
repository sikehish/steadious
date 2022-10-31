import React, { useEffect, useState } from "react";
import useSignup from "./Hooks/useSignup";

function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { signup, error, isLoading, isSucc } = useSignup();
  // const [isSigned, setIsSigned] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, pw);
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
      {error && <div>{error}</div>}
      {isSucc && <div>Succesfuly signed up!</div>}
    </form>
  );
}

export default SignUp;
