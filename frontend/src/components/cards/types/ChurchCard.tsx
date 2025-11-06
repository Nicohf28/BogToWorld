// frontend/src/components/cards/types/ChurchCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function ChurchCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-light" accentLabel="Iglesia" />;
}
