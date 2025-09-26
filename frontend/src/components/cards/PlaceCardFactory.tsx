// frontend/src/components/cards/PlaceCardFactory.tsx
import React, { useState } from "react";

// Importa las variantes de Card por categoría (créalas en ./types/)
import RestaurantCard from "./types/RestaurantCard";
import NaturalParkCard from "./types/NaturalParkCard";
import AmusementParkCard from "./types/AmusementParkCard";
import PlayZoneCard from "./types/PlayZoneCard";
import MallCard from "./types/MallCard";
import PoolCard from "./types/PoolCard";
import BowlingCard from "./types/BowlingCard";
import SoccerFieldCard from "./types/SoccerFieldCard";
import ViewpointCard from "./types/ViewpointCard";
import ChurchCard from "./types/ChurchCard";
import MuseumCard from "./types/MuseumCard";
import DefaultCard from "./types/DefaultCard";

import type { Place } from "../../types";
import { useAuth } from "../../context/useAuth";  // Para saber si el usuario está logueado

/**
 * Mapeo de categoría → componente de Card
 * Las claves deben coincidir EXACTAMENTE con los valores guardados en DB:
 * 'Restaurantes','Parques Naturales','Parques de Diversiones','Zonas de Juegos',
 * 'Centros Comerciales','Piscinas','Boleras','Canchas de Futbol','Miradores','Iglesias','Museos'
 */
const CARD_BY_CATEGORY: Record<string, React.ComponentType<{ place: Place }>> = {
  "Restaurantes": RestaurantCard,
  "Parques Naturales": NaturalParkCard,
  "Parques de Diversiones": AmusementParkCard,
  "Zonas de Juegos": PlayZoneCard,
  "Centros Comerciales": MallCard,
  "Piscinas": PoolCard,
  "Boleras": BowlingCard,
  "Canchas de Futbol": SoccerFieldCard,
  "Miradores": ViewpointCard,
  "Iglesias": ChurchCard,
  "Museos": MuseumCard
};

/**
 * Componente que devuelve la Card adecuada según la categoría del lugar.
 * Si la categoría no existe en el mapeo, usa DefaultCard.
 */
const PlaceCard: React.FC<{ place: Place }> = ({ place }) => {
  const { isAuth } = useAuth();  // Chequear si el usuario está logueado
  const [isFavorite, setIsFavorite] = useState(false);  // Estado del corazón (favorito o no)

  // Función para manejar el click del corazón
  const handleFavoriteClick = () => {
    setIsFavorite(prevState => !prevState);  // Cambiar estado al hacer click
  };

  const Comp = CARD_BY_CATEGORY[place.category] ?? DefaultCard;
  
  return (
    <div className="card">
      <Comp key={place.id} place={place} />

      <div className="card-body">

        {/* Aquí agregamos el botón de corazón condicionalmente */}
        {isAuth && (
          <div className="favorite-container">
            <button 
              className={`btn btn-outline-danger ${isFavorite ? 'filled' : ''}`} 
              onClick={handleFavoriteClick}
            >
              {isFavorite ? '❤️' : '🤍'} {/* Corazón relleno si favorito, vacío si no */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceCard;
