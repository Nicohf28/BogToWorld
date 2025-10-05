import { useEffect, useMemo, useState } from "react";
import { fetchReviews, type ReviewItem } from "../services/api";
import { Link } from "react-router-dom";

function Stars({ value }: { value: number }) {
  return (
    <span aria-label={`Calificación ${value} de 5`} title={`${value}/5`}>
      {"★".repeat(value)}{"☆".repeat(5 - value)}
    </span>
  );
}

export default function Reviews() {
  const [data, setData] = useState<ReviewItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  useEffect(() => {
    setLoading(true);
    fetchReviews(page, pageSize)
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  return (
    <div className="my-3 reviews-scope">
      <h2>Reseñas</h2>
      {loading && <div className="alert alert-info">Cargando reseñas…</div>}
      {!loading && data.length === 0 && (
        <div className="alert alert-warning">No hay reseñas aún.</div>
      )}

      <div className="row g-3">
        {data.map((r) => (
          <div className="col-12" key={r.id}>
            <div className="card shadow-sm">
              <div className="row g-0">
                <div className="col-12 col-md-3">
                  {r.image_url ? (
                    <img
                      src={r.image_url}
                      alt={r.place_name}
                      className="img-fluid rounded-start"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center bg-light rounded-start" style={{height: "100%", minHeight: 140}}>
                      <span className="text-muted">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-9">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-1">{r.place_name}</h5>
                        <span className="badge bg-secondary me-2">{r.category}</span>
                        <Stars value={r.rating} />
                      </div>
                      <small className="text-muted">
                        {new Date(r.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    {r.title && <h6 className="mt-2">{r.title}</h6>}
                    {r.body && <p className="card-text mb-2">{r.body}</p>}
                    <p className="card-text">
                      <small className="text-muted">por {r.user_name}</small>
                    </p>
                    <Link className="btn btn-outline-primary btn-sm" to={`/places?place=${r.place_id}`}>
                      Ver lugar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginado */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination btw-pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, i) => (
              <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
