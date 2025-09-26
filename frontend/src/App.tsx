import { Routes, Route, Link, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Login from "./pages/Login";
import Register from "./pages/register";
import Reviews from "./pages/Reviews";
import { useAuth } from "./context/useAuth";
import "./App.css";

// Asegúrate de tener importado Link en la parte superior del archivo:
// import { Link } from "react-router-dom";
import React from "react";

// Asegúrate arriba de tu archivo tener:
// import React from "react";
// import { Link } from "react-router-dom";

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;

// Ícono por defecto (silueta) si alguna categoría no tiene icono asignado
const DefaultIcon: IconComponent = (props) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);

// Mapa de iconos tipado (siluetas). Ajusta/añade según tus categorías.
const Icons: Record<string, IconComponent> = {
  Restaurantes: (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 3v6a2 2 0 0 0 2 2h0V3M10 3v8M14 3v8M18 3v8M18 11s-2 .5-2-2V3"/>
    </svg>
  ),
  "Parques Naturales": (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2c3 0 5 2 5 5 0 1.7-.7 3-2 3 1.6 0 3 1.6 3 3.5S16.5 17 14 17h-1v5h-2v-5h-1C7.5 17 6 15.9 6 13.5S7.4 10 9 10c-1.3 0-2-1.3-2-3 0-3 2-5 5-5Z"/>
    </svg>
  ),
  "Parques de Diversiones": (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="6"/><path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8"/>
    </svg>
  ),
  "Zonas de Juegos": (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 3h16M6 3v10M18 3v10M9 6v7a3 3 0 0 0 6 0V6"/>
    </svg>
  ),
  "Centros Comerciales": (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>
    </svg>
  ),
  Piscinas: (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 16c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 12c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/>
    </svg>
  ),
  Boleras: (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="6"/><circle cx="10" cy="10" r="1"/><circle cx="13" cy="9" r="1"/><circle cx="12.5" cy="12" r="1"/>
    </svg>
  ),
  "Canchas de Futbol": (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2"/><path d="M12 6v12M3 12h4M17 12h4"/><circle cx="12" cy="12" r="2.2"/>
    </svg>
  ),
  Miradores: (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 7h3v10H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3Zm7 0h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3V7Z"/><circle cx="8" cy="14" r="2.2"/><circle cx="16" cy="14" r="2.2"/>
    </svg>
  ),
  Iglesias: (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M10 5h4M5 12l7-5 7 5v8H5v-8Z"/><path d="M10 20v-6a2 2 0 1 1 4 0v6"/>
    </svg>
  ),
  Museos: (p) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 9l9-5 9 5v2H3V9Z"/><path d="M5 11v8M19 11v8M9 11v8M15 11v8"/>
    </svg>
  ),
};

function CategoryRail({ items }: { items: readonly string[] }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const activeCategory = params.get("category") ?? ""; // p.ej. /places?category=Restaurantes

  return (
    <div className="category-rail-wrapper position-relative">
      <div className="category-rail overflow-auto">
        <div className="category-track">
          {items.map((c) => {
            const Icon: IconComponent = Icons[c] ?? DefaultIcon;
            const isActive = activeCategory.toLowerCase() === c.toLowerCase();

            return (
              <div key={c} className="category-card">
                <Link
                  to={`/places?category=${encodeURIComponent(c)}`}
                  className={
                    "d-inline-flex flex-column align-items-center text-center text-decoration-none text-body" +
                    (isActive ? " is-active" : "")
                  }
                >
                  {/* contenedor para aplicar el círculo activo */}
                  <span className="icon-wrap" aria-hidden="true">
                    <Icon />
                  </span>
                  <small className="mt-1 label">{c}</small>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botones opcionales */}
      <button
        type="button"
        className="btn btn-light btn-sm shadow position-absolute start-0 top-50 translate-middle-y d-none d-md-inline-flex"
        onClick={() => document.querySelector<HTMLDivElement>(".category-rail")?.scrollBy({ left: -240, behavior: "smooth" })}
        aria-label="Desplazar a la izquierda"
      >
        ‹
      </button>
      <button
        type="button"
        className="btn btn-light btn-sm shadow position-absolute end-0 top-50 translate-middle-y d-none d-md-inline-flex"
        onClick={() => document.querySelector<HTMLDivElement>(".category-rail")?.scrollBy({ left: 240, behavior: "smooth" })}
        aria-label="Desplazar a la derecha"
      >
        ›
      </button>
    </div>
  );
}

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
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const activeCategory = params.get("category");

  // Traducciones de segmentos de ruta
  const LABELS: Record<string, string> = {
    places: "Lugares",
    reviews: "Reseñas",
    login: "Iniciar sesión",
    register: "Registrarse",
  };

  // Convierte un segmento en etiqueta legible
  const toLabel = (seg: string) =>
    LABELS[seg] ??
    decodeURIComponent(seg)
      .replace(/-/g, " ")
      .replace(/\b\p{L}/gu, (m) => m.toUpperCase());

  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="mt-2">
      <ol className="breadcrumb mb-0">
        {/* Siempre texto, sin Link, en negrilla */}
        <li className="breadcrumb-item fw-semibold">Inicio</li>

        {parts.map((p, i) => {
          const isLast = i === parts.length - 1 && !activeCategory;
          return (
            <li
              key={`${p}-${i}`}
              className={`breadcrumb-item fw-semibold${isLast ? " active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {toLabel(p)}
            </li>
          );
        })}

        {activeCategory && (
          <li className="breadcrumb-item active fw-semibold" aria-current="page">
            {activeCategory}
          </li>
        )}
      </ol>
    </nav>
  );
}

function UserMenu() {
  const { isAuth, logout } = useAuth();
  if (!isAuth) {
    return (
      <div className="d-flex gap-2">
        <Link className="btn btn-outline-light" to="/login">Iniciar Sesión</Link>
        <Link className="btn btn-outline-light" to="/register">Registrarse</Link>
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
        Más
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

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer border-top mt-4 pt-4 pb-5">
      <div className="container">

        {/* Fila 1: CTA + redes */}
        <div className="row align-items-center g-3 mb-3">
          
          <div className="col-12 col-lg-4 d-flex justify-content-lg-end gap-3">
            <a className="text-body-emphasis" href="#" aria-label="Instagram"><i className="bi bi-instagram fs-5" /></a>
            <a className="text-body-emphasis" href="#" aria-label="TikTok"><i className="bi bi-tiktok fs-5" /></a>
            <a className="text-body-emphasis" href="#" aria-label="YouTube"><i className="bi bi-youtube fs-5" /></a>
            <a className="text-body-emphasis" href="#" aria-label="X / Twitter"><i className="bi bi-twitter-x fs-5" /></a>
          </div>
        </div>

        {/* Aviso ligero (opcional) */}
        <div className="alert alert-light border py-2 mb-4" role="alert">
          <i className="bi bi-info-circle me-2" />
          ¡Explora Bogotá con BogToWorld! encuentra planes, lee reseñas reales y comparte tus experiencias.
        </div>

        {/* Fila 3: columnas de enlaces relevantes al sitio */}
        <div className="row g-4">
          {/* Explora */}
          <div className="col-6 col-md-3">
            <h6 className="text-body fw-semibold mb-3">Explora</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link className="link-body-emphasis text-decoration-none" to="/places">Lugares</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/reviews">Reseñas</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/places?category=Restaurantes">Restaurantes</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/places?category=Parques%20Naturales">Parques Naturales</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/places?category=Museos">Museos</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/places?category=Miradores">Miradores</Link></li>
            </ul>
          </div>

          {/* Mi cuenta */}
          <div className="col-6 col-md-3">
            <h6 className="text-body fw-semibold mb-3">Mi cuenta</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link className="link-body-emphasis text-decoration-none" to="/login">Iniciar sesión</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/register">Registrarse</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/places?favorites=1">Favoritos</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/settings">Ajustes</Link></li>
            </ul>
          </div>

          {/* Ayuda */}
          <div className="col-6 col-md-3">
            <h6 className="text-body fw-semibold mb-3">Ayuda</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link className="link-body-emphasis text-decoration-none" to="/ayuda/como-funciona">Cómo funciona BogToWorld</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/ayuda/faq">Preguntas frecuentes</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/soporte">Centro de soporte</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/reportar">Reportar un error</Link></li>
            </ul>
          </div>

          {/* Legal + boletín */}
          <div className="col-6 col-md-3">
            <h6 className="text-body fw-semibold mb-3">Legal</h6>
            <ul className="list-unstyled small mb-3">
              <li><Link className="link-body-emphasis text-decoration-none" to="/terminos">Términos y condiciones</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/privacidad">Política de privacidad</Link></li>
              <li><Link className="link-body-emphasis text-decoration-none" to="/cookies">Política de cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Línea final */}
        <hr className="my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start small text-secondary">
          <div>© {year} BogToWorld — Hecho con ❤️ en Bogotá.</div>
          <div className="mt-2 mt-md-0">
            <span className="me-2">Idioma:</span>
            <select className="form-select form-select-sm d-inline-block" style={{ width: 140 }}>
              <option>Español</option>
              <option>English</option>
            </select>
          </div>
        </div>

      </div>
    </footer>
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
                width={80}
                height={80}
                className="d-inline-block align-text-top"
                style={{ objectFit: "contain" }}
              />
              <strong>
                <span className="brand-title">BogToWorld</span>
              </strong>
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
              {/* separa pares entre sí con gap; sigue centrado con mx-auto */}
              <ul className="navbar-nav mx-auto d-flex flex-row gap-4 gap-lg-5">

                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-2" to="/places">
                    <img
                      src="/lugar.png"
                      alt="icono lugar"
                      width={40}
                      height={40}
                      className="d-inline-block"
                      style={{ objectFit: "contain" }}
                    />
                    <span>Lugares</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-2" to="/reviews">
                    <img
                      src="/resenias.png"
                      alt="icono reseñas"
                      width={40}
                      height={40}
                      className="d-inline-block"
                      style={{ objectFit: "contain" }}
                    />
                    <span>Reseñas</span>
                  </Link>
                </li>

                <li className="nav-item d-flex align-items-center gap-2">
                  <img
                    src="/ver-mas.png"
                    alt="icono ver más"
                    width={40}
                    height={40}
                    className="d-inline-block align-middle"
                    style={{ objectFit: "contain" }}
                  />
                  <SiteMapMenu />
                </li>
              </ul>

              {/* Empuja el menú de usuario a la derecha */}
              <div className="ms-auto">
                <UserMenu />
              </div>
            </div>
          </div>
        </nav>

        <CategoryRail items={CATEGORIES} />
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

      <Footer />
    </div>
  );
}
