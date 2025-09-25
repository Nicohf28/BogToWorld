// frontend/src/context/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { setAuthToken } from "../services/api";
import { AuthContext, type AuthContextValue } from "./auth-context";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth_token");
    if (saved) {
      setToken(saved);
      setAuthToken(saved);
    }
  }, []);

  const login: AuthContextValue["login"] = (t) => {
    setToken(t);
    setAuthToken(t);
  };

  const logout: AuthContextValue["logout"] = () => {
    setToken(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuth: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
