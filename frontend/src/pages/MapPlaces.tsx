import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

interface Place {
  id: number;
  name: string;
  description: string;
  category: string;
  address: string;
  city: string;
  image_url: string;
  is_new: number;
  created_at: string;
  updated_at?: string;
  latitude: number;
  longitude: number;
}

const PLACES: Place[] = [
    { id:1, name:'Andrés DC', description:'Restaurante icónico de comida colombiana y show en vivo.', category:'Restaurantes', address:'Cl. 82 #12‑21, Zona T', city:'Bogotá', image_url:'http://localhost:4000/static/places/andres-dc.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.66608, longitude:-74.05397 },
    { id:2, name:'El Chato', description:'Restaurante de alta cocina contemporánea liderado por Álvaro Clavijo.', category:'Restaurantes', address:'Cra. 3 #65‑28, Chapinero', city:'Bogotá', image_url:'http://localhost:4000/static/places/el-chato.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.65100, longitude:-74.06200 },
    { id:3, name:'Leo', description:'Propuesta de cocina colombiana de autor de Leonor Espinosa.', category:'Restaurantes', address:'Cl. 27 #6‑75, Centro Internacional', city:'Bogotá', image_url:'http://localhost:4000/static/places/leo-restaurante.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.65295, longitude:-74.06150 },
    { id:4, name:'Parque Simón Bolívar', description:'El parque urbano más grande de Bogotá, lagos y zonas verdes.', category:'Parques Naturales', address:'Av. Calle 63 y Av. 68, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/parque-simon-bolivar.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.65840, longitude:-74.09350 },
    { id:5, name:'Parque Nacional Enrique Olaya Herrera', description:'Histórico pulmón verde con senderos y canchas.', category:'Parques Naturales', address:'Cra. 7 #36‑45, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/parque-nacional-olaya.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.61250, longitude:-74.08410 },
    { id:6, name:'Jardín Botánico de Bogotá', description:'Colecciones de flora andina y jardines temáticos.', category:'Parques Naturales', address:'Cl. 63 #68‑95, Engativá', city:'Bogotá', image_url:'http://localhost:4000/static/places/jardin-botanico.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.64200, longitude:-74.12100 },
    { id:7, name:'Salitre Mágico', description:'Parque de atracciones con montañas rusas y juegos familiares.', category:'Parques de Diversiones', address:'Cra. 68 #63‑63, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/salitre-magico.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.67830, longitude:-74.11020 },
    { id:8, name:'Mundo Aventura', description:'Parque con atracciones mecánicas y áreas temáticas para familias.', category:'Parques de Diversiones', address:'Cra. 71D #1‑14 Sur, Kennedy', city:'Bogotá', image_url:'http://localhost:4000/static/places/mundo-aventura.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.61520, longitude:-74.16700 },
    { id:9, name:'Multiparque', description:'Entretenimiento al aire libre con karts, muros de escalar y más.', category:'Parques de Diversiones', address:'Autopista Norte #224‑60, Suba', city:'Bogotá', image_url:'http://localhost:4000/static/places/multiparque.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.78210, longitude:-74.04200 },
    { id:10, name:'Chuck E. Cheese Bogotá', description:'Centro de juegos infantiles, pizza y shows animatrónicos.', category:'Zonas de Juegos', address:'Cl. 26 #62‑47, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/chuck-e-cheese.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.64820, longitude:-74.08100 },
    { id:11, name:'Playland Unicentro', description:'Arcade y atracciones para niños dentro del centro comercial.', category:'Zonas de Juegos', address:'Cra. 15 #124‑30, Usaquén', city:'Bogotá', image_url:'http://localhost:4000/static/places/playland-unicentro.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.72950, longitude:-74.05500 },
    { id:12, name:'Mundo Aventura Kids', description:'Zona infantil con juegos interactivos y atracciones suaves.', category:'Zonas de Juegos', address:'Cra. 71D #1‑14 Sur, Kennedy', city:'Bogotá', image_url:'http://localhost:4000/static/places/mundo-aventura-kids.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.61520, longitude:-74.16700 },
    { id:13, name:'Centro Comercial Andino', description:'Centro comercial premium en la Zona T.', category:'Centros Comerciales', address:'Cra. 11 #82‑71, Zona T', city:'Bogotá', image_url:'http://localhost:4000/static/places/cc-andino.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.66780, longitude:-74.05550 },
    { id:14, name:'Gran Estación', description:'Centro comercial amplio junto al complejo de Salitre.', category:'Centros Comerciales', address:'Cl. 26 #62‑47, Fontibón', city:'Bogotá', image_url:'http://localhost:4000/static/places/gran-estacion.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.65550, longitude:-74.11250 },
    { id:15, name:'Unicentro Bogotá', description:'Histórico centro comercial con múltiples servicios y entretenimiento.', category:'Centros Comerciales', address:'Cra. 15 #124‑30, Usaquén', city:'Bogotá', image_url:'http://localhost:4000/static/places/unicentro-bogota.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.72950, longitude:-74.05500 },
    { id:16, name:'Complejo Acuático Simón Bolívar', description:'Piscinas olímpicas y recreativas en el Parque Metropolitano.', category:'Piscinas', address:'Av. Calle 63 #47‑06, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/complejo-acuatico-simon-bolivar.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.65450, longitude:-74.08800 },
    { id:17, name:'Piscinas CEFE El Tunal', description:'El Centro de Felicidad CEFE El Tunal es un escenario diseñado para la recreación, el deporte y la cultura, todo en un solo lugar.', category:'Piscinas', address:'Calle 58 A sur #19C‑66', city:'Bogotá', image_url:'http://localhost:4000/static/places/piscinas-CEFE.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-11-06 05:07:23', latitude:4.60030, longitude:-74.14520 },
    { id:18, name:'Compensar Av. 68 - Piscinas', description:'Complejo recreodeportivo con piscinas para cursos y uso libre.', category:'Piscinas', address:'Av. 68 #49A‑47, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/compensar-68-piscinas.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.67820, longitude:-74.10350 },
    { id:19, name:'City Bolo Club', description:'¡Tu Bolera Bar!', category:'Boleras', address:'Transv 99 70A‑89', city:'Bogotá', image_url:'http://localhost:4000/static/places/city-bolo-club.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-11-06 05:14:55', latitude:4.71740, longitude:-74.07010 },
    { id:20, name:'Ice Bowling', description:'Atrévete a participar en los mejores torneos de bolos en Bogotá. Ya sea en nuestros torneos Ice Bowling o en torneos externos, para todas las categorías.', category:'Boleras', address:'Av. Boyacá N° 72 12B‑18', city:'Bogotá', image_url:'http://localhost:4000/static/places/bolera-ice-bowling.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-11-06 05:13:55', latitude:4.71850, longitude:-74.10080 },
    { id:21, name:'Bolera Escape', description:'Bolera Escape es un lugar lleno de energía, donde la música y el entretenimiento se fusionan.', category:'Boleras', address:'Carrera 18 #40 Sur – 18', city:'Bogotá', image_url:'http://localhost:4000/static/places/bolera-escape.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-11-06 05:07:23', latitude:4.61580, longitude:-74.07050 },
    { id:22, name:'Canchas Sintéticas El Campín', description:'Canchas recreativas cercanas al estadio Nemesio Camacho El Campín.', category:'Canchas de Futbol', address:'Cl. 57 #28‑00, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/canchas-el-campin.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.66120, longitude:-74.08400 },
    { id:23, name:'Canchas de Fútbol Parque Simón Bolívar', description:'Canchas públicas en el complejo del parque.', category:'Canchas de Futbol', address:'Av. Calle 63 y Av. 68, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/canchas-parque-simon-bolivar.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.65780, longitude:-74.09280 },
    { id:24, name:'Compensar Canchas de Fútbol', description:'Canchas sintéticas para arriendo y torneos recreativos.', category:'Canchas de Futbol', address:'Av. 68 #49A‑47, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/compensar-canchas-futbol.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.67820, longitude:-74.10350 },
    { id:25, name:'Monserrate', description:'Mirador emblemático con vista panorámica de Bogotá.', category:'Miradores', address:'Cra. 2 Este #21‑48, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/monserrate.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.60890, longitude:-74.06040 },
    { id:26, name:'Cerro de Guadalupe', description:'Mirador alto con santuario y vista de la ciudad.', category:'Miradores', address:'Cra. 2 Este #20‑00, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/cerro-guadalupe.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.60980, longitude:-74.05350 },
    { id:27, name:'Mirador La Calera', description:'Puntos panorámicos en la vía a La Calera con vista nocturna.', category:'Miradores', address:'Vía La Calera Km 7, La Calera', city:'Bogotá', image_url:'http://localhost:4000/static/places/mirador-la-calera.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.71900, longitude:-74.01900 },
    { id:28, name:'Catedral Primada de Bogotá', description:'Catedral neoclásica en la Plaza de Bolívar.', category:'Iglesias', address:'Cra. 7 #11‑10, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/catedral-primada.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.59850, longitude:-74.07500 },
    { id:29, name:'Palacio de San Francisco', description:'Templo colonial con retablos barrocos en el centro.', category:'Iglesias', address:'Cra. 7 #9‑70, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/iglesia-san-francisco.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-11-06 05:07:23', latitude:4.59880, longitude:-74.07450 },
    { id:30, name:'Santuario del Señor Caído de Monserrate', description:'Basílica en la cima del cerro de Monserrate.', category:'Iglesias', address:'Cra. 2 Este #21‑48, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/santuario-monserrate.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.60890, longitude:-74.06040 },
    { id:31, name:'Museo del Oro', description:'Colección de orfebrería prehispánica del Banco de la República.', category:'Museos', address:'Cra. 6 #15‑88, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/museo-del-oro.webp', is_new:1, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.59840, longitude:-74.07600 },
    { id:32, name:'Museo Botero', description:'Obras de Fernando Botero y colección internacional.', category:'Museos', address:'Cl. 11 #4‑41, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/museo-botero.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.59900, longitude:-74.07580 },
    { id:33, name:'Museo Nacional de Colombia', description:'Museo más antiguo del país con arte e historia.', category:'Museos', address:'Cra. 7 #28‑66, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/museo-nacional.webp', is_new:0, created_at:'2025-10-05 04:47:05', updated_at:'2025-10-07 06:56:18', latitude:4.61000, longitude:-74.07000 }

];

const CATEGORY_COLORS: Record<string, string> = {
  "Restaurantes": "#e74c3c",
  "Parques Naturales": "#27ae60",
  "Parques de Diversiones": "#f39c12",
  "Zonas de Juegos": "#8e44ad",
  "Centros Comerciales": "#3498db",
  "Piscinas": "#1abc9c",
  "Boleras": "#d35400",
  "Canchas de Futbol": "#2c3e50",
  "Miradores": "#f1c40f",
  "Iglesias": "#9b59b6",
  "Museos": "#34495e"
};

const createColorIcon = (color: string) => new L.DivIcon({
  html: `<div style="
          background-color: ${color};
          width: 25px;
          height: 25px;
          display: block;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        "></div>`,
  className: "",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

// --- Configuración de centro y zoom por categoría ---
  const CATEGORY_MAP_SETTINGS: { [key: string]: { center: [number, number]; zoom: number } } = {
    "Restaurantes": { center: [4.6560, -74.0590], zoom: 14.5 }, // Promedio de Andrés DC, El Chato, Leo
    "Parques Naturales": { center: [4.6500, -74.0950], zoom: 13 }, // Simón Bolívar, Olaya Herrera, Jardín Botánico
    "Parques de Diversiones": { center: [4.6560, -74.1220], zoom: 12 }, // Salitre, Mundo Aventura, Multiparque
    "Zonas de Juegos": { center: [4.6500, -74.0730], zoom: 13 }, // Chuck E Cheese, Playland, Mundo Aventura Kids
    "Centros Comerciales": { center: [4.6670, -74.0580], zoom: 13 }, // Andino, Gran Estación, Unicentro
    "Piscinas": { center: [4.6440, -74.1150], zoom: 14 }, // Complejo Acuático, CEFE El Tunal, Compensar
    "Boleras": { center: [4.7170, -74.0830], zoom: 12 }, // City Bolo Club, Ice Bowling, Bolera Escape
    "Canchas de Futbol": { center: [4.6610, -74.0930], zoom: 13 }, // El Campín, Parque Simón Bolívar, Compensar
    "Miradores": { center: [4.6120, -74.0560], zoom: 13 }, // Monserrate, Cerro Guadalupe, La Calera
    "Iglesias": { center: [4.6025, -74.0725], zoom: 13 }, // Catedral, San Francisco, Santuario Monserrate
    "Museos": { center: [4.6025, -74.0730], zoom: 14 }, // Museo del Oro, Botero, Nacional
    "": { center: [4.635, -74.0817], zoom: 11.5 },
  };

export default function MapPlaces() {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(PLACES);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const mapRef = useRef<L.Map | null>(null);
  const categories = Object.keys(CATEGORY_COLORS);
  const [showDropdown, setShowDropdown] = useState(false);


  // --- Filtrado por categoría ---
  useEffect(() => {
    if (selectedCategory) {
      setFilteredPlaces(PLACES.filter((p) => p.category === selectedCategory));
    } else {
      setFilteredPlaces(PLACES);
    }

    // --- Aplicar centro y zoom específico ---
    const map = mapRef.current;
    if (map) {
      const settings = CATEGORY_MAP_SETTINGS[selectedCategory || ""];
      map.setView(settings.center, settings.zoom);
    }
  }, [selectedCategory]);

  const handleMarkerClick = (place: Place) => {
    if (mapRef.current) {
      mapRef.current.setView([place.latitude, place.longitude], 16);
    }
  };

  const handlePopupClose = () => {
    const map = mapRef.current;
    if (map) {
      const settings = CATEGORY_MAP_SETTINGS[selectedCategory || ""];
      map.setView(settings.center, settings.zoom);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Dropdown */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000, fontSize: "14px" }}>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            backgroundColor: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            cursor: "pointer",
            userSelect: "none",
            fontWeight: "bold",
            minWidth: "180px",
          }}
        >
          {selectedCategory || "Todas las categorías"}
        </div>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              marginTop: "4px",
              overflow: "hidden",
              minWidth: "180px",
            }}
          >
            <div
              onClick={() => { setSelectedCategory(""); setShowDropdown(false); }}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid #eee"
              }}
            >
              <span style={{
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                border: "1px solid #999",
                backgroundColor: "#ccc"
              }}></span>
              Todas las categorías
            </div>

            {categories.map(c => (
              <div
                key={c}
                onClick={() => { setSelectedCategory(c); setShowDropdown(false); }}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "1px solid #eee"
                }}
              >
                <span style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "3px",
                  backgroundColor: CATEGORY_COLORS[c],
                  border: "1px solid #999"
                }}></span>
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      <MapContainer
        center={CATEGORY_MAP_SETTINGS[""].center}
        zoom={CATEGORY_MAP_SETTINGS[""].zoom}
        style={{ width: "100%", height: "500px" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={createColorIcon(CATEGORY_COLORS[place.category])}
            eventHandlers={{
              click: () => handleMarkerClick(place),
              popupclose: handlePopupClose,
            }}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.description}
              <br />
              {place.address}
              <br />
              <img src={place.image_url} alt={place.name} style={{ width: "100px", marginTop: "5px" }}/>
            </Popup>
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
              {place.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}