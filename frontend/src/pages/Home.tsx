
import "./Home.css";
import { useNavigate} from "react-router-dom";
import MapView from "./MapPlaces";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

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

      {/* Sección de video promocional */}
      <section className="container my-5 map-section">
        <h2 className="mb-3">¡Conoce BogToWorld!</h2>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/7LTRfS9kGTQ"
            title="¡Conoce BogToWorld!"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>
      
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
          <div
            className="service-card p-0"
            onClick={() => {
              if (isAuth) {
                navigate("/favorites");
              } else {
                handleOpen(); // muestra modal
              }
            }}
          >
            <img
              src="/2favoritos.png"
              alt="Publicidad Favoritos"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="service-card p-0" onClick={() => navigate("/places")}>
            <img
              src="/1mapa.png"
              alt="Publicidad Lugares Nuevos"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="service-card p-0" onClick={() => navigate("/reviews")}>
            <img
              src="/1reseñas.png"
              alt="Publicidad Reseñas"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Antes de comenzar!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Debes iniciar sesión para acceder a tus favoritos.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={() => { setShowModal(false); navigate("/login"); }}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Lugares recomendados */}
      <section className="places">
        <h2>Lugares recomendados</h2>
        <div className="places-grid">
          <div className="place-card">
            <img src="/recomended_places/multiparque.jpg" alt="Multiparque" />
            <div className="p-4">
              <h3>Multiparque</h3>
              <p>Diversión al aire libre</p>
            </div>
          </div>
          <div className="place-card">
            <img src="/recomended_places/mundo-aventura.jpg" alt="Mundo Aventura" />
            <div className="p-4">
              <h3>Mundo Aventura</h3>
              <p>Atracciones y espectáculos</p>
            </div>
          </div>
          <div className="place-card">
            <img src="/recomended_places/salitre-magico.jpg" alt="Salitre Mágico" />
            <div className="p-4">
              <h3>Salitre Mágico</h3>
              <p>Montañas rusas y adrenalina</p>
            </div>
          </div>
          <div className="place-card">
            <img src="/recomended_places/monserrate.jpg" alt="Monserrate" />
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
    </div>
  );
}
