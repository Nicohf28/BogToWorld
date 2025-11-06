// frontend/src/components/cards/types/MuseumCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function MuseumCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-warning" accentLabel="Museo" />;
}
