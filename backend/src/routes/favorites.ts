
import { Router } from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favorites.controller";

const router = Router();

// Ruta para obtener los favoritos de un usuario
router.get("/", getFavorites);

// Ruta para agregar un lugar a favoritos
router.post("/", addFavorite);

// Ruta para eliminar un lugar de favoritos
router.delete("/:placeId", removeFavorite);

export default router;
