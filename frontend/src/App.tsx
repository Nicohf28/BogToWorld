import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Login from "./pages/Login";
import Register from "./pages/register"; // 👈 mayúscula
import Reviews from "./pages/Reviews";
import { useAuth } from "./context/useAuth";
import "./App.css";

const CATEGORIES = [
  "Restaurantes",
  "Parques Naturales",
  "Parques de Diversiones",
  "Zonas de Juegos",
  "Centros Comerciales",
  "Piscinas",
  "Boleras",
  "Canchas de Futbol",
  "Miradores",
  "Iglesias",
  "Museos",
] as const;

function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  return (
    <nav aria-label="breadcrumb" className="mt-2">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        {parts.map((p, i) => {
          const url = "/" + parts.slice(0, i + 1).join("/");
          const isLast = i === parts.length - 1;
          return (
            <li
              key={url}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? p : <Link to={url}>{p}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function UserMenu() {
  const { isAuth, logout } = useAuth();
  if (!isAuth) {
    return (
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-light" to="/login">Login</Link>
        <Link className="btn btn-outline-light" to="/register">Register</Link>
      </div>
    );
  }
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
        data-bs-toggle="dropdown"
      >
        <span
          className="rounded-circle bg-light text-dark d-inline-flex justify-content-center align-items-center"
          style={{ width: 28, height: 28 }}
          aria-label="Perfil"
          title="Perfil"
        >
          <span style={{ fontSize: 16 }}>👤</span>
        </span>
        <span>Mi cuenta</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><button className="dropdown-item" onClick={logout}>Cerrar sesión</button></li>
      </ul>
    </div>
  );
}

function SiteMapMenu() {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
        Menú
      </a>
      <ul className="dropdown-menu">
        <li><h6 className="dropdown-header">Lugares por categoría</h6></li>
        {CATEGORIES.map((c) => (
          <li key={c}>
            <Link className="dropdown-item" to={`/places?category=${encodeURIComponent(c)}`}>
              {c}
            </Link>
          </li>
        ))}
        <li><hr className="dropdown-divider" /></li>
        <li><h6 className="dropdown-header">Lugares por etiqueta</h6></li>
        <li><Link className="dropdown-item" to="/places?is_new=1">Nuevos</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><h6 className="dropdown-header">Reseñas</h6></li>
        <li><Link className="dropdown-item" to="/reviews">Ver Reseñas</Link></li>
      </ul>
    </li>
  );
}

export default function App() {
  return (
    <div className="container">
      {/* ====== HEADER COMPLETO ====== */}
      <header className="app-header rounded mt-3">
        <nav className="navbar navbar-expand-lg app-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img
                src="/logo.png"
                alt="BogToWorld"
                width={50}
                height={50}
                className="d-inline-block align-text-top"
                style={{ objectFit: "contain" }}
              />
              <span className="brand-title">BogToWorld</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div id="navContent" className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/places">Lugares</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reviews">Reseñas</Link></li>
                <SiteMapMenu />
              </ul>
              <UserMenu />
            </div>
          </div>
        </nav>
      </header>
      {/* ====== /HEADER ====== */}

      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
