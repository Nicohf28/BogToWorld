// frontend/src/layouts/PublicLayout.tsx
import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="container my-5">
      {/* Botón de regreso al home */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-primary">&larr; Volver al inicio</Link>
      </div>

      {/* Aquí se renderizará el contenido de la página */}
      <Outlet />
    </div>
  );
}
