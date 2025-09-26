
import { createContext } from "react";

// Definir el tipo para el usuario (ajústalo según lo que necesites)
export type User = {
  id: number;
  name: string;
  email: string;
  // agrega otros campos según lo que necesites para el usuario
};

export type AuthContextValue = {
  token: string | null;
  isAuth: boolean;
  user: User | null;  // Aquí agregamos la propiedad 'user'
  login: (token: string, user: User) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextValue | null>(null);
