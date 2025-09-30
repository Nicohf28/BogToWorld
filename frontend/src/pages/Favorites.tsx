import { useEffect, useState } from "react";
import type { Place } from "../types";
import { getFavorites } from "../services/api";
import PlaceCard from "../components/cards/PlaceCardFactory";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    getFavorites().then(favs => setFavorites(favs));
  }, []);

  return (
    <div className="my-4">
      <h2>Mis Favoritos</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        {favorites.map(place => (
          <div className="col" key={place.id}>
            <PlaceCard place={place} />
          </div>
        ))}
      </div>
    </div>
  );
}
