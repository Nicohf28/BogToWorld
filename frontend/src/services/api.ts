// frontend/src/services/api.ts
import axios, { isAxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { Place, Category } from "../types";

console.log("API baseURL:", import.meta.env.VITE_API_URL || "http://localhost:4000/api");

/** Instancia base de Axios apuntando a la API */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

/** Setea o limpia el token de autenticación en Axios + localStorage */
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("auth_token", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("auth_token");
  }
}

/** Tipos para la lista de lugares */
export type PlacesQuery = {
  page: number;
  pageSize: number;
  q?: string;
  category?: Category;
  is_new?: 1;
};

export type PlacesResponse = {
  data: Place[];
  page: number;
  pageSize: number;
  total: number;
};

/**
 * Obtiene lugares con filtros y paginado.
 * Usa AbortController (cancelación con signal). No usa CancelToken (deprecado en Axios v1).
 */
export async function fetchPlaces(
  params: PlacesQuery,
  signal?: AbortSignal
): Promise<PlacesResponse> {
  const res: AxiosResponse<PlacesResponse> = await api.get("/places", {
    params,
    signal,
  });
  return res.data;
}

/** Login: devuelve { token } del backend */
export async function login(email: string, password: string): Promise<{ token: string }> {
  const res = await api.post<{ token: string }>("/auth/login", { email, password });
  return res.data;
}

/** Helper opcional: intenta extraer mensaje de error legible */
type ApiErrorData = { error?: string; message?: string };

function isApiErrorData(data: unknown): data is ApiErrorData {
  return typeof data === "object" && data !== null &&
         ("error" in data || "message" in data);
}

export function errorMessage(err: unknown, fallback = "Ocurrió un error.") {
  if (isAxiosError(err)) {
    const data = err.response?.data;
    if (isApiErrorData(data)) {
      return data.error?.toString() ?? data.message?.toString() ?? fallback;
    }
    return err.message || fallback;
  }
  if (err instanceof Error) return err.message || fallback;
  return fallback;
}

export type ReviewItem = {
  id: number;
  rating: number;
  title: string | null;
  body: string | null;
  created_at: string;
  user_name: string;
  place_id: number;
  place_name: string;
  category: string;
  image_url: string | null;
};

export type ReviewsResponse = {
  data: ReviewItem[];
  page: number;
  pageSize: number;
  total: number;
};

export async function fetchReviews(page = 1, pageSize = 10): Promise<ReviewsResponse> {
  const res = await api.get<ReviewsResponse>("/reviews", { params: { page, pageSize } });
  return res.data;
}

export async function addFavorite(placeId: number) {
  const res = await api.post("/favorites", { placeId });
  return res.data;
}

export async function removeFavorite(placeId: number) {
  const res = await api.delete("/favorites", { data: { placeId } });
  return res.data;
}

export async function getFavorites() {
  const res = await api.get("/favorites");
  return res.data.data as Place[];
}

export async function fetchPlacesMap() {
  const res = await api.get("/places"); // sin paginación para el mapa
  return res.data.data; // devuelve array de Place[]
}