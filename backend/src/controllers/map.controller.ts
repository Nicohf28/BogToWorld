
import { Request, Response } from "express";
import { pool } from "../db/pool";

export async function listMapPlaces(_req: Request, res: Response) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(
      `SELECT id, name, description, address, latitude, longitude 
       FROM places
       WHERE latitude IS NOT NULL AND longitude IS NOT NULL`
    );
    res.json(rows);
  } catch (e) {
    console.error("❌ Error en listMapPlaces:", e);
    res.status(500).json({ error: "No se pudieron obtener los lugares para el mapa" });
  } finally {
    if (conn) conn.release();
  }
}
