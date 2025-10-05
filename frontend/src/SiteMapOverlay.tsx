// frontend/src/SiteMapOverlay.tsx
import "./SiteMapMenu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SiteMapOverlayProps {
  show: boolean;       // si el overlay se muestra
  onClose: () => void; // función para cerrarlo
}

export default function SiteMapOverlay({ show, onClose }: SiteMapOverlayProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isOpen = (section: string) => openSection === section;

  if (!show) return null;

  return (
    <div className="sitemap-overlay">
      <div className="offcanvas-body p-4">

        {/* ===== Botón Volver ===== */}
        <button
          className="sitemap-back-btn mb-3 d-flex align-items-center gap-2"
          onClick={onClose}
        >
          <span style={{ fontSize: 20 }}>←</span> Volver
        </button>

        <h5 className="fw-bold mb-3 text-dark">Mapa del sitio</h5>

        <ul className="sitemap-list list-unstyled">

          {/* ===== Lugares ===== */}
          <li>
            <button className="sitemap-parent" onClick={() => toggle("lugares")}>
              Lugares
              <span className="sitemap-arrow">{isOpen("lugares") ? "›" : "›"}</span>
            </button>
            {isOpen("lugares") && (
              <ul className="sitemap-sublist">
                {[
                  "Todos los lugares",
                  "Restaurantes",
                  "Parques Naturales",
                  "Parques de Diversión",
                  "Zonas de Juegos",
                  "Centros Comerciales",
                  "Piscinas",
                  "Boleras",
                  "Canchas de Futbol",
                  "Miradores",
                  "Iglesias",
                  "Museos",
                  "Favoritos",
                ].map((name) => (
                  <li key={name}>
                    <Link
                      to={name === "Todos los lugares" ? "/places" : `/places?category=${encodeURIComponent(name)}`}
                      onClick={onClose} // 👈 cierra el overlay al hacer click
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* ===== Mi Cuenta ===== */}
          <li>
            <button className="sitemap-parent" onClick={() => toggle("miCuenta")}>
              Mi cuenta
              <span className="sitemap-arrow">{isOpen("miCuenta") ? "›" : "›"}</span>
            </button>
            {isOpen("miCuenta") && (
              <ul className="sitemap-sublist">
                <li><Link to="/login" onClick={onClose}>Iniciar sesión</Link></li>
                <li><Link to="/register" onClick={onClose}>Registrarse</Link></li>
                <li><Link to="/settings" onClick={onClose}>Ajustes</Link></li>
              </ul>
            )}
          </li>

          {/* ===== Reseñas ===== */}
          <li>
            <button className="sitemap-parent" onClick={() => toggle("resenas")}>
              Reseñas
              <span className="sitemap-arrow">{isOpen("resenas") ? "›" : "›"}</span>
            </button>
            {isOpen("resenas") && (
              <ul className="sitemap-sublist">
                <li><Link to="/reviews" onClick={onClose}>Ver todas</Link></li>
                <li><Link to="/reviews/usuarios" onClick={onClose}>De usuarios</Link></li>
                <li><Link to="/reviews/lugares" onClick={onClose}>De lugares</Link></li>
              </ul>
            )}
          </li>

          {/* ===== Ayuda ===== */}
          <li>
            <button className="sitemap-parent" onClick={() => toggle("ayuda")}>
              Ayuda
              <span className="sitemap-arrow">{isOpen("ayuda") ? "›" : "›"}</span>
            </button>
            {isOpen("ayuda") && (
              <ul className="sitemap-sublist">
                <li><Link to="/ayuda/como-funciona" onClick={onClose}>Cómo funciona BogToWorld</Link></li>
                <li><Link to="/ayuda/faq" onClick={onClose}>Preguntas frecuentes</Link></li>
                <li><Link to="/soporte" onClick={onClose}>Centro de soporte</Link></li>
                <li><Link to="/reportar" onClick={onClose}>Reportar un error</Link></li>
              </ul>
            )}
          </li>

          {/* ===== Legal ===== */}
          <li>
            <button className="sitemap-parent" onClick={() => toggle("legal")}>
              Legal
              <span className="sitemap-arrow">{isOpen("legal") ? "›" : "›"}</span>
            </button>
            {isOpen("legal") && (
              <ul className="sitemap-sublist">
                <li><Link to="/terminos" onClick={onClose}>Términos y condiciones</Link></li>
                <li><Link to="/privacidad" onClick={onClose}>Política de privacidad</Link></li>
                <li><Link to="/cookies" onClick={onClose}>Política de cookies</Link></li>
              </ul>
            )}
          </li>

        </ul>

        <hr className="my-4" />

        <footer className="sitemap-footer">
        © {new Date().getFullYear()} BogToWorld. Todos los derechos reservados.
        <Link to="/privacidad">Política de Privacidad</Link>
        </footer>

      </div>
    </div>
  );
}
