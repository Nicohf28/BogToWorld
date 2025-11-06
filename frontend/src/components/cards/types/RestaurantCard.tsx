import type { Place } from "../../../types";
import BasePlaceCard from "./BasePlaceCard";

export default function RestaurantCard({ place }: { place: Place }) {
  return <BasePlaceCard place={place} accentClass="accent-danger" accentLabel="Restaurante" />;
}
