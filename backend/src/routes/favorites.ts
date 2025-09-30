import { Router } from "express";
import { addFavorite, removeFavorite, listFavorites } from "../controllers/favorites.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware); // solo usuarios logueados
router.post("/", addFavorite);       // agregar
router.delete("/", removeFavorite);  // quitar
router.get("/", listFavorites);      // listar

export default router;
