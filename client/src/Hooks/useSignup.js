import { useState } from "react";
import { useAuthContext } from "./AuthContext";

function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucc, setIsSucc] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    const res = await fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // mode: "no-cors",
        // "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.err, res);
      setIsLoading(false);
      setIsSucc(false);
      //Some error -  refer to userController to see what error was thrown and most imp-the err property name
      setError(data.err);
    } else if (res.ok) {
      dispatch({ type: "SIGNUP" });
      // localStorage.setItem("user", JSON.stringify(data));
      setIsSucc(true);
      setIsLoading(false);
      setError(false);
    }
  };

  // console.log(error);
  return { signup, error, isLoading, isSucc };
}

export default useSignup;
