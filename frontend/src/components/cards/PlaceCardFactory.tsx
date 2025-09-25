// frontend/src/components/cards/PlaceCardFactory.tsx
import React from "react";

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
 * Factory que devuelve la Card adecuada según la categoría del lugar.
 * Si la categoría no existe en el mapeo, usa DefaultCard.
 */
export default function createPlaceCard(place: Place) {
  const Comp = CARD_BY_CATEGORY[place.category] ?? DefaultCard;
  return <Comp key={place.id} place={place} />;
}
