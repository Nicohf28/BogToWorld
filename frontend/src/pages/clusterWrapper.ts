
import * as L from "leaflet";
import "leaflet.markercluster";

// Creamos un tipo local para MarkerClusterGroup
export type MarkerClusterGroup = L.FeatureGroup & {
  addLayer(layer: L.Layer): MarkerClusterGroup;
  clearLayers(): void;
};

// Función para crear un cluster
export const createMarkerCluster = (): MarkerClusterGroup => {
  // Aquí usamos un cast interno, fuera del resto del código no hay any
  return (L as any).markerClusterGroup() as MarkerClusterGroup;
};
