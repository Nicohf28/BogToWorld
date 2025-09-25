import type { Place } from "../../../types";

/**
 * Card base reutilizable para todas las categorías.
 * - Muestra imagen, nombre, descripción, dirección y categoría.
 * - Si place.is_new === 1, muestra la etiqueta NUEVO.
 * - Puedes personalizar el borde y un pequeño rótulo con `accentClass` y `accentLabel`.
 */
export default function BasePlaceCard({
  place,
  accentClass = "",
  accentLabel,
}: {
  place: Place;
  accentClass?: string; // ej: "border-success", "border-primary"
  accentLabel?: string; // ej: "Restaurante", "Museo"
}) {
  return (
    <div className={`card h-100 ${accentClass}`} style={{ overflow: "hidden" }}>
      <div className="position-relative">
        {place.image_url && (
          <img
            src={place.image_url}
            alt={place.name}
            className="card-img-top"
            style={{ objectFit: "cover", height: 160 }}
          />
        )}
        {place.is_new === 1 && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            NUEVO
          </span>
        )}
        {accentLabel && (
          <span className="badge bg-secondary position-absolute top-0 end-0 m-2">
            {accentLabel}
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{place.name}</h5>
        {place.description && (
          <p className="card-text" style={{ flex: 1 }}>
            {place.description.length > 120
              ? place.description.slice(0, 117) + "..."
              : place.description}
          </p>
        )}
        <div className="d-flex flex-wrap gap-1 align-items-center">
          <span className="badge bg-light text-dark">
            {place.category}
          </span>
          {place.address && (
            <span className="badge bg-outline-secondary border">
              {place.address}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
