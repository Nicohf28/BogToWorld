// frontend/src/components/cards/types/BowlingCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function BowlingCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="border-dark" accentLabel="Bolera" />;
}
