// frontend/src/components/cards/types/NaturalParkCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function NaturalParkCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-success" accentLabel="Parque Natural" />;
}
