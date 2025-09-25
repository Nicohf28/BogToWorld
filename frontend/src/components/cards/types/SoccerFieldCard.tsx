// frontend/src/components/cards/types/SoccerFieldCard.tsx
import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function SoccerFieldCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="border-success" accentLabel="Cancha de Fútbol" />;
}
