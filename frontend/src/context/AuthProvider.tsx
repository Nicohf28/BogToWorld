
import React, { useEffect, useState } from "react";
import { setAuthToken } from "../services/api";
import { AuthContext, type AuthContextValue } from "./auth-context";

// Definir el tipo de usuario (ajústalo según lo que necesites)
export type User = {
  id: number;
  name: string;
  email: string;
  // otros campos si es necesario
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);  // Añadimos el estado de 'user'

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);

      // Aquí es donde deberías recuperar también la información del usuario, si es necesario
      const savedUser = JSON.parse(localStorage.getItem("auth_user") || "null");
      if (savedUser) {
        setUser(savedUser);  // Recuperamos al usuario guardado
      }
    }
  }, []);

  const login: AuthContextValue["login"] = (t, u) => {
    setToken(t);
    setUser(u);  // Guardamos al usuario cuando se loguea
    setAuthToken(t);

    // Guardar en el localStorage
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user", JSON.stringify(u));  // Guardamos el usuario
  };

  const logout: AuthContextValue["logout"] = () => {
    setToken(null);
    setUser(null);  // Limpiamos el usuario
    setAuthToken(null);

    // Limpiar del localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ token, isAuth: !!token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
