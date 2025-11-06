// frontend/src/components/cards/types/ViewpointCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function ViewpointCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-secondary" accentLabel="Mirador" />;
}
