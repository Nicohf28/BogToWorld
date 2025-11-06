import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { placeExtras } from "../data/placeExtras";
import { slugify } from "../utils/slug";

// Ajusta este tipo a tu proyecto real
type Place = {
  id: string | number;
  name: string;
  description?: string;
  image_url?: string;
  category?: string;
  address?: string;
  is_new?: number | boolean;
  custom_text?: string;
  youtube_id?: string;
};

async function fetchPlaceById(id: string | number): Promise<Place> {
  const res = await fetch(`/api/places/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el lugar");
  return (await res.json()) as Place;
}

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation() as { state?: Place };
  const [place, setPlace] = useState<Place | null>(() => {
    if (!state) return null;
    const key = slugify(state.name);
    const extra = placeExtras[key];
    return extra ? { ...state, custom_text: extra.custom_text, youtube_id: extra.youtubeId } : state;
  });
  const [loading, setLoading] = useState<boolean>(!state);
  const [error, setError] = useState<string | null>(null);

  const placeId = useMemo(() => id ?? (state?.id as string | undefined), [id, state]);

  useEffect(() => {
    if (place) return;          // ya vino por state
    if (!placeId) return;       // no hay id
    setLoading(true);
    fetchPlaceById(placeId)
      .then((p) => {
        const key = slugify(p.name);
        const extra = placeExtras[key];
        setPlace(extra ? { ...p, custom_text: extra.custom_text, youtube_id: extra.youtubeId } : p);
      })
      .catch(() => setError("No se pudo cargar el lugar"))
      .finally(() => setLoading(false));
  }, [placeId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="container my-4">Cargando…</div>;
  if (error) return <div className="container my-4 text-danger">{error}</div>;
  if (!place) return <div className="container my-4">Lugar no encontrado</div>;

  const isNew = place.is_new === 1 || place.is_new === true;

  return (
    <div className="container my-4">
      <Link
        to="/places"
        className="btn mb-3"
        style={{
          backgroundColor: "#4c360a",
          color: "white",
          border: "none",
        }}
      >
        ← Volver a lugares
      </Link>

      <div className="card">
        {place.image_url && (
          <img
            src={place.image_url}
            alt={place.name}
            className="card-img-top"
            style={{ objectFit: "cover", maxHeight: 360 }}
          />
        )}
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between gap-2">
            <h1 className="h3 m-0">{place.name}</h1>
            <div className="d-flex gap-2">
              {isNew && <span className="badge bg-danger">NUEVO</span>}
              {place.category && (
                <span className="badge bg-secondary">{place.category}</span>
              )}
            </div>
          </div>

          {place.address && (
            <div className="text-muted mt-2">{place.address}</div>
          )}

          {place.description && (
            <p className="mt-3">{place.description}</p>
          )}

          {place.custom_text && (
            <div className="mt-4">
              <h2 className="h5">Información destacada</h2>
              <p className="mb-0">{place.custom_text}</p>
            </div>
          )}

          {place.youtube_id && (
            <div className="ratio ratio-16x9 mt-4">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${place.youtube_id}`}
                title={`Video de ${place.name}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
              />
            </div>
          )}

          {/* Espacio para más módulos: mapa, horarios, reseñas, etc. */}
        </div>
      </div>
    </div>
  );
}
