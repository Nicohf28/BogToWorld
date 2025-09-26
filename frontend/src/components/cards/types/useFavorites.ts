
import { useState, useEffect } from "react";

export function useFavorites(userId: number) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/favorites?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data.map((place: any) => place.id)));
    }
  }, [userId]);

  const addFavorite = (placeId: number) => {
    fetch(`/api/favorites`, {
      method: "POST",
      body: JSON.stringify({ userId, placeId }),
      headers: { "Content-Type": "application/json" },
    }).then(() => setFavorites([...favorites, placeId]));
  };

  const removeFavorite = (placeId: number) => {
    fetch(`/api/favorites/${placeId}`, { method: "DELETE" }).then(() =>
      setFavorites(favorites.filter((id) => id !== placeId))
    );
  };

  return { favorites, addFavorite, removeFavorite };
}
