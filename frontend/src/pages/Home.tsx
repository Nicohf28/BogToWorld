// frontend/src/pages/Home.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    navigate(`/places?${params.toString()}`);
  }

  return (
    <div className="my-4">
      {/* Hero */}
      <section className="p-4 p-md-5 mb-4 text-white rounded" style={{background: "linear-gradient(135deg, #e67c47ff 0%, #cfc95d 100%)"}}>
        <div className="row align-items-center g-3">
          <div className="col-12 col-lg-7">
            <h1 className="display-5 fw-semibold mb-2">BogToWorld</h1>
            <p className="lead mb-3">
              Explora los mejores <strong>sitios de interés en Bogotá</strong>: museos, miradores, parques, restaurantes y más. 
              Filtra por categoría, encuentra lugares “<em>Nuevos</em>” y lee reseñas de otros visitantes.
            </p>
            <form className="d-flex gap-2" onSubmit={onSearch}>
              <input
                className="form-control form-control-lg"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Busca: Museo del Oro, Monserrate, parque…"
                aria-label="Buscar lugares"
              />
              <button className="btn btn-dark btn-lg" type="submit">Buscar</button>
            </form>
            <div className="mt-3 d-flex flex-wrap gap-2">
              <Link className="btn btn-outline-light btn-sm" to="/places">Ver todos los lugares</Link>
              <Link className="btn btn-outline-light btn-sm" to="/places?is_new=1">Solo nuevos</Link>
              <Link className="btn btn-outline-light btn-sm" to="/reviews">Leer reseñas</Link>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title mb-2">¿Qué puedes hacer aquí?</h5>
                <ul className="mb-0">
                  <li>Buscar lugares por nombre y <strong>filtrar</strong> por categoría.</li>
                  <li>Ver lugares con la etiqueta <strong>“Nuevo”</strong>.</li>
                  <li>Explorar tarjetas con <strong>descripción</strong> e imagen.</li>
                  <li>Leer <strong>reseñas</strong> y calificaciones de la comunidad.</li>
                  <li><strong>Registrarte / Iniciar sesión</strong> para interactuar.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acciones rápidas */}
      <section className="mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Explora lugares</h5>
                <p className="card-text text-muted">
                  Recorre el listado completo con paginación y filtros avanzados.
                </p>
                <Link className="btn btn-primary" to="/places">Ir a Lugares</Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Descubre lo nuevo</h5>
                <p className="card-text text-muted">
                  Mira las últimas incorporaciones marcadas con la etiqueta <strong>“nuevo”</strong>.
                </p>
                <Link className="btn btn-primary" to="/places?is_new=1">Ver “Nuevos”</Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Lee reseñas</h5>
                <p className="card-text text-muted">
                  Opiniones de visitantes reales para ayudarte a decidir tu próxima visita.
                </p>
                <Link className="btn btn-primary" to="/reviews">Ir a Reseñas</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="mb-0">Categorías destacadas</h5>
          <Link to="/places" className="text-decoration-none">Ver todas →</Link>
        </div>
        <div className="row g-2">
          {CATEGORIES.slice(0, 6).map((c) => (
            <div className="col-6 col-md-4 col-lg-2" key={c}>
              <Link
                className="btn w-100"
                to={`/places?category=${encodeURIComponent(c)}`}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                {c}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA inferior */}
      <section className="mt-4">
        <div className="alert alert-light border d-flex flex-column flex-md-row align-items-md-center justify-content-between">
          <div className="mb-2 mb-md-0">
            <strong>¿Primera vez por aquí?</strong> Crea tu cuenta para guardar tus sitios favoritos.
          </div>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-secondary" to="/login">Ya tengo cuenta</Link>
            <Link className="btn btn-primary" to="/register">Registrarme</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
