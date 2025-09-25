// frontend/src/components/cards/types/PoolCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function PoolCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="border-info" accentLabel="Piscina" />;
}
