// frontend/src/types/index.ts

// Debe coincidir EXACTAMENTE con las categorías del backend/DB (ENUM)
export type Category =
  | "Restaurantes"
  | "Parques Naturales"
  | "Parques de Diversiones"
  | "Zonas de Juegos"
  | "Centros Comerciales"
  | "Piscinas"
  | "Boleras"
  | "Canchas de Futbol"
  | "Miradores"
  | "Iglesias"
  | "Museos";

export interface Place {
  id: number;
  name: string;
  description?: string;
  address?: string;
  image_url?: string;
  category: Category;
  is_new: 0 | 1;
}
