// frontend/src/components/cards/types/AmusementParkCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function AmusementParkCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-warning" accentLabel="Parque de Diversiones" />;
}
