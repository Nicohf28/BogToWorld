// frontend/src/components/cards/types/PlayZoneCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function PlayZoneCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-info" accentLabel="Zona de Juegos" />;
}
