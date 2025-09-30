
import "./Home.css";
import Places from "./Places";
import { useNavigate, Routes, Route } from "react-router-dom";
import MapView from "./MapPlaces";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Encabezado principal */}
      <header className="home-header">
        <div className="header-container">
          <div className="header-text">
            <h1>BogToWorld</h1>
            <p>
              Descubre Bogotá como nunca antes: desde rincones culturales y parques vibrantes hasta experiencias únicas que harán de tu visita un recuerdo inolvidable.
            </p>
          </div>
        </div>
      </header>

      
      {/* Sección del mapa */}
      <section className="map-section">
        <h2>Sitios que puedes Visitar</h2>
        <div className="map-wrapper">
          <MapView />
        </div>
      </section>

      {/* Servicios que ofrecemos */}
      <section className="services">
        <h2>Servicios que ofrecemos</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src="../../public/services/descuento.jpg" alt="Descuento 30%" />
            <div className="p-4">
              <h3>Descuento 30%</h3>
              <p>En parques y actividades seleccionadas para que disfrutes más por menos.</p>
            </div>
          </div>
          <div className="service-card">
            <img src="../../public/services/paquetes.jpg" alt="Paquetes familiares" />
            <div className="p-4">
              <h3>Paquetes familiares</h3>
              <p>Combina diversión y comodidad con nuestras ofertas especiales para familias.</p>
            </div>
          </div>
          <div className="service-card">
            <img src="../../public/services/nuevas-experiencias.jpg" alt="Nuevas experiencias" />
            <div className="p-4">
              <h3>Nuevas experiencias</h3>
              <p>Descubre actividades recientes y exclusivas que harán tu visita inolvidable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lugares recomendados */}
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
