
import "./SiteMapMenu.css";
import { useState } from "react";

interface SiteMapMenuProps {
  onClose?: () => void; // permite cerrar el overlay desde el botón "volver"
}

export default function SiteMapMenu({ onClose }: SiteMapMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isOpen = (section: string) => openSection === section;

  return (
    <div className="offcanvas-body p-4">
      {/* ===== Botón Volver arriba ===== */}
      {onClose && (
        <button
          className="sitemap-back-btn mb-3 d-flex align-items-center gap-2"
          onClick={onClose}
        >
          <span style={{ fontSize: 24 }}>←</span> Volver
        </button>
      )}

      <h5 className="fw-bold mb-3 text-dark">Mapa del sitio</h5>

      <ul className="sitemap-list list-unstyled">

        {/* ===== Lugares ===== */}
        <li>
          <button className="sitemap-parent" onClick={() => toggle("lugares")}>
            Lugares <span style={{ fontSize: 20 }}>{isOpen("lugares") ? "▼" : "›"}</span>
          </button>
          {isOpen("lugares") && (
            <ul className="sitemap-sublist">
              <li><a href="/places">Todos los lugares</a></li>
              <li><a href="/places?category=Restaurantes">Restaurantes</a></li>
              <li><a href="/places?category=Parques%20Naturales">Parques Naturales</a></li>
              <li><a href="/places?category=Parques%20de%20Diversiones">Parques de Diversión</a></li>
              <li><a href="/places?category=Zonas%20de%20Juegos">Zonas de Juegos</a></li>
              <li><a href="/places?category=Centros%20Comerciales">Centros Comerciales</a></li>
              <li><a href="/places?category=Piscinas">Piscinas</a></li>
              <li><a href="/places?category=Boleras">Boleras</a></li>
              <li><a href="/places?category=Canchas%20de%20Futbol">Canchas de Futbol</a></li>
              <li><a href="/places?category=Miradores">Miradores</a></li>
              <li><a href="/places?category=Iglesias">Iglesias</a></li>
              <li><a href="/places?category=Museos">Museos</a></li>
              <li><a href="/places?favorites=1">Favoritos</a></li>
            </ul>
          )}
        </li>

        {/* ===== Mi Cuenta ===== */}
        <li>
          <button className="sitemap-parent" onClick={() => toggle("miCuenta")}>
            Mi cuenta <span style={{ fontSize: 20 }}>{isOpen("miCuenta") ? "▼" : "›"}</span>
          </button>
          {isOpen("miCuenta") && (
            <ul className="sitemap-sublist">
              <li><a href="/login">Iniciar sesión</a></li>
              <li><a href="/register">Registrarse</a></li>
              <li><a href="/settings">Ajustes</a></li>
            </ul>
          )}
        </li>

        {/* ===== Reseñas ===== */}
        <li>
          <button className="sitemap-parent" onClick={() => toggle("resenas")}>
            Reseñas <span style={{ fontSize: 20 }}>{isOpen("resenas") ? "▼" : "›"}</span>
          </button>
          {isOpen("resenas") && (
            <ul className="sitemap-sublist">
              <li><a href="/reviews">Ver todas</a></li>
              <li><a href="/reviews/usuarios">De usuarios</a></li>
              <li><a href="/reviews/lugares">De lugares</a></li>
            </ul>
          )}
        </li>

        {/* ===== Ayuda ===== */}
        <li>
          <button className="sitemap-parent" onClick={() => toggle("ayuda")}>
            Ayuda <span style={{ fontSize: 20 }}>{isOpen("ayuda") ? "▼" : "›"}</span>
          </button>
          {isOpen("ayuda") && (
            <ul className="sitemap-sublist">
              <li><a href="/ayuda/como-funciona">Cómo funciona BogToWorld</a></li>
              <li><a href="/ayuda/faq">Preguntas frecuentes</a></li>
              <li><a href="/soporte">Centro de soporte</a></li>
              <li><a href="/reportar">Reportar un error</a></li>
            </ul>
          )}
        </li>

        {/* ===== Legal ===== */}
        <li>
          <button className="sitemap-parent" onClick={() => toggle("legal")}>
            Legal <span style={{ fontSize: 20 }}>{isOpen("legal") ? "▼" : "›"}</span>
          </button>
          {isOpen("legal") && (
            <ul className="sitemap-sublist">
              <li><a href="/terminos">Términos y condiciones</a></li>
              <li><a href="/privacidad">Política de privacidad</a></li>
              <li><a href="/cookies">Política de cookies</a></li>
            </ul>
          )}
        </li>

      </ul>

      <hr className="my-4" />

      <footer className="sitemap-footer text-muted small">
        <p>© {new Date().getFullYear()} BogToWorld. Todos los derechos reservados.</p>
        <p><a href="/privacidad">Política de Privacidad</a></p>
      </footer>
    </div>
  );
}
