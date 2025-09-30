// frontend/src/layouts/PublicLayout.tsx
import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="container my-5">
      {/* Botón de regreso al home */}
      <Link 
        to="/" 
        className="btn"
        style={{ backgroundColor: "#4c360a", color: "#fff", border: "none" }}
      >
        &larr; Volver al Inicio
      </Link>

      {/* Aquí se renderizará el contenido de la página */}
      <Outlet />
    </div>
  );
}
