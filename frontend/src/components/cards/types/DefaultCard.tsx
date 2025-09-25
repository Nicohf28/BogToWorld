// frontend/src/components/cards/types/DefaultCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function DefaultCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="border-0" />;
}
