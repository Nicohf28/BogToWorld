import { Request, Response } from "express";
import { pool } from "../db/pool";

// Agregar a favoritos
export async function addFavorite(req: Request, res: Response) {
  const userId = req.user!.id; // del JWT middleware
  const { placeId } = req.body;

  try {
    await pool.query(
      "INSERT INTO favorites (user_id, place_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id",
      [userId, placeId]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo agregar a favoritos" });
  }
}

// Quitar de favoritos
export async function removeFavorite(req: Request, res: Response) {
  const userId = req.user!.id;
  const { placeId } = req.body;

  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND place_id = ?",
      [userId, placeId]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo quitar de favoritos" });
  }
}

// Obtener favoritos de usuario
export async function listFavorites(req: Request, res: Response) {
  const userId = req.user!.id;

  try {
    const [rows] = await pool.query(
      `SELECT p.*
       FROM places p
       JOIN favorites f ON f.place_id = p.id
       WHERE f.user_id = ?`,
      [userId]
    );
    res.json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo obtener favoritos" });
  }
}
