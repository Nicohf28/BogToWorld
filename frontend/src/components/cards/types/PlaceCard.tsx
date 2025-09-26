
import React from "react";
import { useFavorites } from "./useFavorites";  // Ahora puedes usar una ruta relativa simple

// Definir HeartIcon directamente en este archivo
const HeartIcon: React.FC<{ color?: string }> = ({ color = "gray" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

function PlaceCard({ place, userId }: { place: any; userId: number }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites(userId);

  const isFavorite = favorites.includes(place.id);

  return (
    <div className="place-card">
      <img src={place.image_url} alt={place.name} />
      <h3>{place.name}</h3>
      <p>{place.description}</p>
      <button onClick={() => isFavorite ? removeFavorite(place.id) : addFavorite(place.id)}>
        <HeartIcon color={isFavorite ? "red" : "gray"} />
      </button>
    </div>
  );
}

export default PlaceCard;
