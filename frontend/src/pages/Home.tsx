import "./Home.css";
import Places from "./Places";
import { useNavigate, Routes, Route } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Encabezado principal */}
      <header className="home-header">
        <div>
          <h1>BogToWorld</h1>
          <p>Explora sitios de interés en Bogotá.</p>
        </div>
      </header>

      {/* Sección de buscador */}
      <section className="search-box">
        <input type="text" placeholder="¿Qué lugar buscas?" />
        <select>
          <option>Parques de Diversiones</option>
          <option>Parques Naturales</option>
          <option>Restaurantes</option>
        </select>
        <input type="date" />
        <button>Buscar</button>
      </section>

      {/* Promociones destacadas */}
      <section className="promos">
        <div className="promo-card promo-blue">
          <h3>Descuento 30%</h3>
          <p>En parques y actividades seleccionadas.</p>
        </div>
        <div className="promo-card promo-green">
          <h3>Paquetes familiares</h3>
          <p>Multiparque + Almuerzo incluido.</p>
        </div>
        <div className="promo-card promo-red">
          <h3>Nuevas experiencias</h3>
          <p>Descubre actividades recientes en Bogotá.</p>
        </div>
      </section>

      {/* Lugares sugeridos */}
      <section className="places">
        <h2>Lugares recomendados</h2>
        <div className="places-grid">
          <div className="place-card">
            <img src="../../public/recomended_places/multiparque.jpg" alt="Multiparque" />
            <div className="p-4">
              <h3>Multiparque</h3>
              <p>Diversión al aire libre</p>
            </div>
          </div>
          <div className="place-card">
            <img src="../../public/recomended_places/mundo-aventura.jpg" alt="Mundo Aventura" />
            <div className="p-4">
              <h3>Mundo Aventura</h3>
              <p>Atracciones y espectáculos</p>
            </div>
          </div>
          <div className="place-card">
            <img src="../../public/recomended_places/salitre-magico.jpg" alt="Salitre Mágico" />
            <div className="p-4">
              <h3>Salitre Mágico</h3>
              <p>Montañas rusas y adrenalina</p>
            </div>
          </div>
          <div className="place-card">
            <img src="../../public/recomended_places/monserrate.jpg" alt="Monserrate" />
            <div className="p-4">
              <h3>Monserrate</h3>
              <p>Turismo cultural y vistas</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center mt-4">
        <button className="btn btn-more" onClick={() => navigate("/places")}>
          <strong>Ver más lugares</strong>
        </button>
      </div>

      <Routes>
        <Route path="/places" element={<Places />} />
      </Routes>
    </div>
  );
}