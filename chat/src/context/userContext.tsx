import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/config";

interface UserContextType {
  jwt: string | null;
  setJWT: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
  jwt: null,
  setJWT: () => {},
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [jwt, setJWT] = useState<string | null>(() => localStorage.getItem("jwt"));

  const verifyJWT = async () => {
    try {
      const { msg } = await axios.get(`${ENDPOINT}/auth/verify`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(res => res.data);
    } catch (error) {
     logout();
      console.error("Error al verificar JWT", error);
    }
  };

  const logout = () => {
    setJWT(null);
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  // 🧠 Actualiza localStorage automáticamente cuando cambie jwt
  useEffect(() => {
    if (jwt) {
      localStorage.setItem("jwt", jwt);
    } else {
      localStorage.removeItem("jwt");
    }
  }, [jwt]);



  // 🧠 Verifica JWT al montar si existe
  useEffect(() => {
    if (jwt) {
      console.log("Verificando JWT al montar...");
      verifyJWT();
    }
  }, [jwt]);

  return (
    <UserContext.Provider value={{ jwt, setJWT }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
