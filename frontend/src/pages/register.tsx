// frontend/src/pages/Register.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { isAxiosError } from "axios";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function Register() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string>("");
  const [okMsg, setOkMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOkMsg("");

    // Validaciones rápidas en cliente
    if (!form.name.trim()) return setError("El nombre es obligatorio.");
    if (!form.email.trim()) return setError("El email es obligatorio.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Email inválido.");
    if (form.password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (form.password !== form.confirm) return setError("Las contraseñas no coinciden.");

    setLoading(true);
    try {
      await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      setOkMsg("Registro exitoso. Redirigiendo a Login…");
      setTimeout(() => navigate("/login"), 900);
    } catch (err: unknown) {
      let msg = "No se pudo completar el registro. Intenta de nuevo.";
      if (isAxiosError(err)) {
        msg = err.response?.data?.error ?? msg;
      } else if (err instanceof Error) {
        msg = err.message || msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h3 className="mb-3">Crear cuenta</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {okMsg && <div className="alert alert-success">{okMsg}</div>}

          <form onSubmit={onSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre completo</label>
              <input
                id="name"
                name="name"
                className="form-control"
                value={form.name}
                onChange={onChange}
                disabled={loading}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={onChange}
                disabled={loading}
                required
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={onChange}
                disabled={loading}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
              />
              <div className="form-text">
                Usa una contraseña segura (mezcla mayúsculas, minúsculas, números y símbolos).
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirm" className="form-label">Confirmar contraseña</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                className="form-control"
                value={form.confirm}
                onChange={onChange}
                disabled={loading}
                required
              />
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
              <Link to="/login" className="btn btn-outline-secondary">
                Ya tengo cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
