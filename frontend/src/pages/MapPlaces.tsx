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
    { id:1, name:'Andrés DC', description:'Restaurante icónico de comida colombiana y show en vivo.', category:'Restaurantes', address:'Cl. 82 #12-21, Zona T', city:'Bogotá', image_url:'http://localhost:4000/static/places/andres-dc.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6674000, longitude:-74.0560000 },
    { id:2, name:'El Chato', description:'Restaurante de alta cocina contemporánea liderado por Álvaro Clavijo.', category:'Restaurantes', address:'Cra. 3 #65-28, Chapinero', city:'Bogotá', image_url:'http://localhost:4000/static/places/el-chato.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6534000, longitude:-74.0628000 },
    { id:3, name:'Leo', description:'Propuesta de cocina colombiana de autor de Leonor Espinosa.', category:'Restaurantes', address:'Cl. 27 #6-75, Centro Internacional', city:'Bogotá', image_url:'http://localhost:4000/static/places/leo-restaurante.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6530000, longitude:-74.0615000 },
    { id:4, name:'Parque Simón Bolívar', description:'El parque urbano más grande de Bogotá, lagos y zonas verdes.', category:'Parques Naturales', address:'Av. Calle 63 y Av. 68, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/parque-simon-bolivar.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6584000, longitude:-74.0935000 },
    { id:5, name:'Parque Nacional Enrique Olaya Herrera', description:'Histórico pulmón verde con senderos y canchas.', category:'Parques Naturales', address:'Cra. 7 #36-45, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/parque-nacional-olaya.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6260000, longitude:-74.0635000 },
    { id:6, name:'Jardín Botánico de Bogotá', description:'Colecciones de flora andina y jardines temáticos.', category:'Parques Naturales', address:'Cl. 63 #68-95, Engativá', city:'Bogotá', image_url:'http://localhost:4000/static/places/jardin-botanico.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6656000, longitude:-74.0940000 },
    { id:7, name:'Salitre Mágico', description:'Parque de atracciones con montañas rusas y juegos familiares.', category:'Parques de Diversiones', address:'Cra. 68 #63-63, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/salitre-magico.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6659000, longitude:-74.0789000 },
    { id:8, name:'Mundo Aventura', description:'Parque con atracciones mecánicas y áreas temáticas para familias.', category:'Parques de Diversiones', address:'Cra. 71D #1-14 Sur, Kennedy', city:'Bogotá', image_url:'http://localhost:4000/static/places/mundo-aventura.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6212000, longitude:-74.1472000 },
    { id:9, name:'Multiparque', description:'Entretenimiento al aire libre con karts, muros de escalar y más.', category:'Parques de Diversiones', address:'Autopista Norte #224-60, Suba', city:'Bogotá', image_url:'http://localhost:4000/static/places/multiparque.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.7833000, longitude:-74.0429000 },
    { id:10, name:'Chuck E. Cheese Bogotá', description:'Centro de juegos infantiles, pizza y shows animatrónicos.', category:'Zonas de Juegos', address:'Cl. 26 #62-47, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/chuck-e-cheese.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.7030000, longitude:-74.0465000 },
    { id:11, name:'Playland Unicentro', description:'Arcade y atracciones para niños dentro del centro comercial.', category:'Zonas de Juegos', address:'Cra. 15 #124-30, Usaquén', city:'Bogotá', image_url:'http://localhost:4000/static/places/playland-unicentro.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.7017000, longitude:-74.0421000 },
    { id:12, name:'Mundo Aventura Kids', description:'Zona infantil con juegos interactivos y atracciones suaves.', category:'Zonas de Juegos', address:'Cra. 71D #1-14 Sur, Kennedy', city:'Bogotá', image_url:'http://localhost:4000/static/places/mundo-aventura-kids.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6200000, longitude:-74.1465000 },
    { id:13, name:'Centro Comercial Andino', description:'Centro comercial premium en la Zona T.', category:'Centros Comerciales', address:'Cra. 11 #82-71, Zona T', city:'Bogotá', image_url:'http://localhost:4000/static/places/cc-andino.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6676000, longitude:-74.0521000 },
    { id:14, name:'Gran Estación', description:'Centro comercial amplio junto al complejo de Salitre.', category:'Centros Comerciales', address:'Cl. 26 #62-47, Fontibón', city:'Bogotá', image_url:'http://localhost:4000/static/places/gran-estacion.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6473000, longitude:-74.1066000 },
    { id:15, name:'Unicentro Bogotá', description:'Histórico centro comercial con múltiples servicios y entretenimiento.', category:'Centros Comerciales', address:'Cra. 15 #124-30, Usaquén', city:'Bogotá', image_url:'http://localhost:4000/static/places/unicentro-bogota.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.7017000, longitude:-74.0421000 },
    { id:16, name:'Complejo Acuático Simón Bolívar', description:'Piscinas olímpicas y recreativas en el Parque Metropolitano.', category:'Piscinas', address:'Av. Calle 63 #47-06, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/complejo-acuatico-simon-bolivar.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6570000, longitude:-74.0945000 },
    { id:17, name:'Centro de Alto Rendimiento (CAR) - Piscinas', description:'Escenarios acuáticos para entrenamiento y eventos.', category:'Piscinas', address:'Cra. 60 #63-65, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/car-piscinas.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6585000, longitude:-74.0930000 },
    { id:18, name:'Compensar Av. 68 - Piscinas', description:'Complejo recreodeportivo con piscinas para cursos y uso libre.', category:'Piscinas', address:'Av. 68 #49A-47, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/compensar-68-piscinas.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:07', latitude:4.6485000, longitude:-74.0973000 },
    { id:19, name:'Bowling Star Unicentro', description:'Bolera dentro de Unicentro con pistas y snacks.', category:'Boleras', address:'Cra. 15 #124-30, Usaquén', city:'Bogotá', image_url:'http://localhost:4000/static/places/bowling-star-unicentro.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.7010000, longitude:-74.0425000 },
    { id:20, name:'Strike Bowling Parque La Colina', description:'Pistas modernas, bar y juegos en C.C. Parque La Colina.', category:'Boleras', address:'Cl. 146 #58-39, Suba', city:'Bogotá', image_url:'http://localhost:4000/static/places/strike-bowling-parque-la-colina.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.7308000, longitude:-74.0585000 },
    { id:21, name:'Bolera El Salitre', description:'Bolera tradicional en la zona de Salitre.', category:'Boleras', address:'Av. 68 #55-65, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/bolera-el-salitre.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6570000, longitude:-74.0940000 },
    { id:22, name:'Canchas Sintéticas El Campín', description:'Canchas recreativas cercanas al estadio Nemesio Camacho El Campín.', category:'Canchas de Futbol', address:'Cl. 57 #28-00, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/canchas-el-campin.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6474000, longitude:-74.0789000 },
    { id:23, name:'Canchas de Fútbol Parque Simón Bolívar', description:'Canchas públicas en el complejo del parque.', category:'Canchas de Futbol', address:'Av. Calle 63 y Av. 68, Teusaquillo', city:'Bogotá', image_url:'http://localhost:4000/static/places/canchas-parque-simon-bolivar.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6580000, longitude:-74.0938000 },
    { id:24, name:'Compensar Canchas de Fútbol', description:'Canchas sintéticas para arriendo y torneos recreativos.', category:'Canchas de Futbol', address:'Av. 68 #49A-47, Barrios Unidos', city:'Bogotá', image_url:'http://localhost:4000/static/places/compensar-canchas-futbol.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6480000, longitude:-74.0980000 },
    { id:25, name:'Monserrate', description:'Mirador emblemático con vista panorámica de Bogotá.', category:'Miradores', address:'Cra. 2 Este #21-48, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/monserrate.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6054000, longitude:-74.0561000 },
    { id:26, name:'Cerro de Guadalupe', description:'Mirador alto con santuario y vista de la ciudad.', category:'Miradores', address:'Cra. 2 Este #20-00, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/cerro-guadalupe.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.5951000, longitude:-74.0386000 },
    { id:27, name:'Mirador La Calera', description:'Puntos panorámicos en la vía a La Calera con vista nocturna.', category:'Miradores', address:'Vía La Calera Km 7, La Calera', city:'Bogotá', image_url:'http://localhost:4000/static/places/mirador-la-calera.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6940000, longitude:-73.9670000 },
    { id:28, name:'Catedral Primada de Bogotá', description:'Catedral neoclásica en la Plaza de Bolívar.', category:'Iglesias', address:'Cra. 7 #11-10, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/catedral-primada.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.5981000, longitude:-74.0760000 },
    { id:29, name:'Iglesia de San Francisco', description:'Templo colonial con retablos barrocos en el centro.', category:'Iglesias', address:'Cra. 7 #9-70, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/iglesia-san-francisco.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6016000, longitude:-74.0732000 },
    { id:30, name:'Santuario del Señor Caído de Monserrate', description:'Basílica en la cima del cerro de Monserrate.', category:'Iglesias', address:'Cra. 2 Este #21-48, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/santuario-monserrate.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6054000, longitude:-74.0561000 },
    { id:31, name:'Museo del Oro', description:'Colección de orfebrería prehispánica del Banco de la República.', category:'Museos', address:'Cra. 6 #15-88, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/museo-del-oro.jpg', is_new:1, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6010000, longitude:-74.0721000 },
    { id:32, name:'Museo Botero', description:'Obras de Fernando Botero y colección internacional.', category:'Museos', address:'Cl. 11 #4-41, La Candelaria', city:'Bogotá', image_url:'http://localhost:4000/static/places/museo-botero.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6026000, longitude:-74.0713000 },
    { id:33, name:'Museo Nacional de Colombia', description:'Museo más antiguo del país con arte e historia.', category:'Museos', address:'Cra. 7 #28-66, Santa Fe', city:'Bogotá', image_url:'http://localhost:4000/static/places/museo-nacional.jpg', is_new:0, created_at:'2025-09-23 16:35:28', updated_at:'2025-09-30 15:58:08', latitude:4.6176000, longitude:-74.0671000 }
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

export default function MapPlaces() {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(PLACES);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const mapRef = useRef<L.Map | null>(null);
  const categories = Object.keys(CATEGORY_COLORS);
  const [showDropdown, setShowDropdown] = useState(false);

  // --- Configuración de centro y zoom por categoría ---
  const CATEGORY_MAP_SETTINGS: { [key: string]: { center: [number, number]; zoom: number } } = {
    "Restaurantes": { center: [4.6586, -74.0608], zoom: 15 },
    "Parques Naturales": { center: [4.6500, -74.0830], zoom: 13 },
    "Parques de Diversiones": { center: [4.6570, -74.0890], zoom: 10 },
    "Zonas de Juegos": { center: [4.6750, -74.0650], zoom: 13 },
    "Centros Comerciales": { center: [4.6650, -74.0600], zoom: 13 },
    "Piscinas": { center: [4.6550, -74.0940], zoom: 14.5 },
    "Boleras": { center: [4.7150, -74.0500], zoom: 12 },
    "Canchas de Futbol": { center: [4.6500, -74.0850], zoom: 13 },
    "Miradores": { center: [4.6300, -74.0500], zoom: 12 },
    "Iglesias": { center: [4.6000, -74.0730], zoom: 13 },
    "Museos": { center: [4.6050, -74.0700], zoom: 14 },
    "": { center: [4.635, -74.0817], zoom: 11.5 },
  };

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


 
















































