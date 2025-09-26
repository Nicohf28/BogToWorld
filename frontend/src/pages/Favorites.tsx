
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import PlaceCard from "../components/cards/types/PlaceCard";  // Asegúrate de que PlaceCard esté importado correctamente

function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      // Obtener los favoritos desde el backend
      fetch(`/api/favorites?user_id=${user.id}`)
        .then((response) => response.json())
        .then((data) => setFavorites(data.map((place: any) => place.id)))
        .catch((err) => console.error("Error fetching favorites:", err));
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Favoritos</h1>
      <div className="places-list">
        {favorites.map((favoritePlaceId) => (
          <PlaceCard key={favoritePlaceId} place={{ id: favoritePlaceId }} userId={user.id} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
