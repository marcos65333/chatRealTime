import { useContext, useCallback, useState } from "react";
import Context from "../context/userContext";
import loginService from "../services/login";
import type ILogin from "../interfaces/login";


export default function useUser() {
  const { jwt, setJWT } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const login = useCallback(async ({ email, password }: ILogin) => {
    setLoading(true);
    setError(false);
    try {
      const res = await loginService({ email, password });
      const token = res.data.token;
  
      setJWT(token);

    } catch (err: unknown) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      setJWT(null);
  
      const errorMsg = (err as { detail?: string })?.detail || "Error al iniciar sesión";
      console.error(errorMsg, "Error al iniciar sesión");
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [setJWT]);
  
  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setJWT(null);
    window.location.href = "/";
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: loading,
    hasLoginError: Boolean(error),
    login,
    logout,
    error
  };
}
