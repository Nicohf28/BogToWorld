// frontend/src/pages/Places.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPlaces } from "../services/api";
import type { Place, Category } from "../types";
import PlaceCard from "../components/cards/PlaceCardFactory";  // Ahora importamos PlaceCard como componente

type PlacesQuery = {
  page: number;
  pageSize: number;
  q?: string;
  category?: Category;
  is_new?: 1; // cuando marcas "Solo nuevos"
};

// Lista canónica de categorías (debe coincidir EXACTO con tu type Category / DB)
const CATEGORIES: readonly Category[] = [
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

// Type guard: string -> Category
function isCategory(v: string): v is Category {
  return (CATEGORIES as readonly string[]).includes(v);
}

export default function Places() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<Place[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [q, setQ] = useState("");
  // Permitimos "" para representar "todas"
  const [category, setCategory] = useState<Category | "">("");
  const [isNew, setIsNew] = useState(false);

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  // Flag para evitar bucles al sincronizar URL <-> estado
  const syncingFromURL = useRef(false);

  // 1) Leer SIEMPRE los params de la URL (cuando cambian)
  useEffect(() => {
    syncingFromURL.current = true;

    const spQ = searchParams.get("q") ?? "";
    const spCategory = searchParams.get("category") ?? "";
    const spIsNew = searchParams.get("is_new") === "1";
    const spPage = Number(searchParams.get("page") || "1");

    if (q !== spQ) setQ(spQ);
    if (isNew !== spIsNew) setIsNew(spIsNew);
    if (Number.isFinite(spPage) && spPage > 0 && page !== spPage) setPage(spPage);

    if (spCategory && isCategory(spCategory)) {
      if (category !== spCategory) setCategory(spCategory);
    } else if (!spCategory && category !== "") {
      setCategory("");
    }

    const t = setTimeout(() => {
      syncingFromURL.current = false;
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 2) Llamada a la API cuando cambien los filtros/página
  useEffect(() => {
    const params: PlacesQuery = { page, pageSize };
    if (q) params.q = q;
    if (category && isCategory(category)) params.category = category;
    if (isNew) params.is_new = 1;

    fetchPlaces(params)
      .then((res: { data: Place[]; total: number }) => {
        const unique = Array.from(new Map(res.data.map(p => [p.id, p])).values());
        setData(unique);
        setTotal(res.total);
      })
      .catch((err: unknown) => console.error(err));
  }, [page, pageSize, q, category, isNew]);

  // 3) Sincronizar URL cuando se usan los controles (sin ternarios "huérfanos")
  const updateURL = useCallback(
  (next: {
    q?: string;
    category?: Category | "";
    is_new?: boolean;
    page?: number;
  }) => {
    if (syncingFromURL.current) return;

    const sp = new URLSearchParams(searchParams);

    if (next.q !== undefined) {
      if (next.q) sp.set("q", next.q);
      else sp.delete("q");
    }

    if (next.category !== undefined) {
      if (next.category) sp.set("category", next.category);
      else sp.delete("category");
    }

    if (next.is_new !== undefined) {
      if (next.is_new) sp.set("is_new", "1");
      else sp.delete("is_new");
    }

    if (next.page !== undefined) {
      if (next.page > 1) sp.set("page", String(next.page));
      else sp.delete("page"); // limpia si es 1
    }

    setSearchParams(sp, { replace: true });
  },
  [searchParams, setSearchParams]
);

  // Handlers de filtros
  const onSearchChange = (value: string) => {
    setQ(value);
    setPage(1);
    updateURL({ q: value, page: 1 });
  };

  const onCategoryChange = (value: Category | "") => {
    setCategory(value);
    setPage(1);
    updateURL({ category: value, page: 1 });
  };

  const onIsNewChange = (checked: boolean) => {
    setIsNew(checked);
    setPage(1);
    updateURL({ is_new: checked, page: 1 });
  };

  const goToPage = (p: number) => {
    setPage(p);
    updateURL({ page: p });
  };

  useEffect(() => {
    const tp = Math.max(1, Math.ceil(total / pageSize));
    if (page > tp) {
      setPage(tp);
      updateURL({ page: tp }); // usa tu helper actual para sync URL
    }
  }, [total, pageSize, page, updateURL]);

  return (
    <div className="my-3">
      <h2>Lugares</h2>

      {/* Filtros */}
      <div className="row g-2 align-items-end mb-3">
        <div className="col-12 col-sm-6 col-md-4">
          <label className="form-label">Buscar</label>
          <input
            className="form-control"
            value={q}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Museo del Oro, Monserrate, parque..."
          />
        </div>

        <div className="col-6 col-md-4">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as Category | "")}
          >
            <option value="">Todas</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-4">
          <div className="form-check mt-4">
            <input
              id="isNew"
              className="form-check-input"
              type="checkbox"
              checked={isNew}
              onChange={(e) => onIsNewChange(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isNew">
              Solo nuevos
            </label>
          </div>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        {data.map((place) => (
          <div className="col" key={place.id}>
            <PlaceCard place={place} />  {/* Ahora usamos el componente PlaceCard */}
          </div>
        ))}
      </div>

      {/* Paginado */}
      <nav className="mt-3">
        <ul className="pagination btw-pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(Math.max(1, page - 1))}>
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => goToPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages || totalPages === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(Math.min(totalPages || 1, page + 1))}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
