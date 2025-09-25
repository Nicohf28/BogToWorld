// frontend/src/components/cards/types/MallCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function MallCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="border-primary" accentLabel="Centro Comercial" />;
}
