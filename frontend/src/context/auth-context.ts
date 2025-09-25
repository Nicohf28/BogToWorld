// frontend/src/context/auth-context.ts
export type AuthContextValue = {
  token: string | null;
  isAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// No exportes ningún componente aquí.
import { createContext } from "react";
export const AuthContext = createContext<AuthContextValue | null>(null);
