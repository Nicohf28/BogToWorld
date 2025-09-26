
import { Request, Response } from "express";
// Corregir el import para apuntar al archivo correcto
import { pool } from "../db/pool";  // Aquí usamos el pool de la base de datos

// Obtener los favoritos de un usuario
export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.query.user_id;
  
  const query = `
    SELECT p.* FROM places p
    JOIN favorites f ON p.id = f.place_id
    WHERE f.user_id = ?
  `;

  try {
    const [rows] = await pool.execute(query, [userId]);  // Usamos el pool para ejecutar la consulta
    res.json(rows);  // Retorna los lugares favoritos
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los favoritos" });
  }
};

// Agregar un lugar a favoritos
export const addFavorite = async (req: Request, res: Response) => {
  const { userId, placeId } = req.body;

  const query = `
    INSERT INTO favorites (user_id, place_id) 
    VALUES (?, ?)
  `;

  try {
    await pool.execute(query, [userId, placeId]);
    res.status(201).json({ message: "Favorito agregado" });  // Respuesta al agregar
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar el favorito" });
  }
};

// Eliminar un lugar de favoritos
export const removeFavorite = async (req: Request, res: Response) => {
  const { placeId } = req.params;
  const userId = req.query.user_id;  // Obtener el user_id desde la query

  const query = `
    DELETE FROM favorites 
    WHERE user_id = ? AND place_id = ?
  `;

  try {
    await pool.execute(query, [userId, placeId]);
    res.status(200).json({ message: "Favorito eliminado" });  // Respuesta al eliminar
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el favorito" });
  }
};
