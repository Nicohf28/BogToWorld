// frontend/src/components/Map.tsx
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { api } from "../services/api";

type Place = {
  id: number;
  name: string;
  address: string | null;
  city: string;
  // Agrega lat/lng si lo tienes en DB
  latitude?: number;
  longitude?: number;
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 4.711, // Bogotá
  lng: -74.072,
};

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY || "", // define tu key en .env
  });

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    api.get("/places").then((res) => setPlaces(res.data.data));
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {places.map((p) => (
        p.latitude && p.longitude ? (
          <Marker
            key={p.id}
            position={{ lat: p.latitude, lng: p.longitude }}
            title={p.name}
          />
        ) : null
      ))}
    </GoogleMap>
  );
}
