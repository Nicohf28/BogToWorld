import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { api } from "../services/api";
import { isAxiosError } from "axios";
import { useAuth } from "../context/useAuth";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuth, login } = useAuth();

  // si ya está autenticado, redirige fuera de login
  if (isAuth) return <Navigate to="/places" replace />;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token: string = res.data.token;
      login(token);
      navigate("/places", { replace: true });
    } catch (error: unknown) {
      let msg = "No se pudo iniciar sesión.";
      if (isAxiosError(error)) msg = error.response?.data?.error ?? msg;
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <h3>Inicio de Sesión</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="form-label">Correo Electrónico</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className="btn btn-loading" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
