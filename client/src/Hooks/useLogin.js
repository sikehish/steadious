import { useState } from "react";
import { useAuthContext } from "./AuthContext";

function useLogin() {
  const [error, setError] = useState(null);
  const [isSucc, setIsSucc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsSucc(false);
    setIsLoading(true);
    setError(false);

    const res = await fetch("http://localhost:8000/api/user/login", {
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
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      setError(false);
      setIsLoading(false);
      setIsSucc(true);
    }
  };

  return { login, error, isLoading, isSucc };
}

export default useLogin;
