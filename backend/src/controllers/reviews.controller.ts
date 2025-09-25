import { Request, Response } from "express";
import { pool } from "../db/pool";

/** GET /api/reviews  — lista todas las reseñas con info del lugar (paginado) */
export async function listAllReviews(req: Request, res: Response) {
  let conn;
  try {
    const { page = "1", pageSize = "10" } = req.query as Record<string, string>;
    const pageNum = Math.max(1, Number(page) || 1);
    const sizeNum = Math.min(50, Math.max(1, Number(pageSize) || 10));
    const offset = (pageNum - 1) * sizeNum;

    conn = await pool.getConnection();

    const [countRows] = await conn.query(`SELECT COUNT(*) AS total FROM reviews`);
    const total = (countRows as any[])[0]?.total ?? 0;

    const [rows] = await conn.query(
      `SELECT r.id, r.rating, r.title, r.body, r.created_at,
              u.name AS user_name,
              p.id AS place_id, p.name AS place_name, p.category, p.image_url
       FROM reviews r
       JOIN users  u ON u.id = r.user_id
       JOIN places p ON p.id = r.place_id
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [sizeNum, offset]
    );

    res.json({ data: rows, page: pageNum, pageSize: sizeNum, total });
  } catch (e) {
    console.error("[listAllReviews]", e);
    res.status(500).json({ error: "Error listando reseñas" });
  } finally {
    if (conn) conn.release();
  }
}

/** GET /api/reviews/place/:placeId — lista reseñas de un lugar con promedio */
export async function listReviewsByPlace(req: Request, res: Response) {
  let conn;
  try {
    const placeId = Number(req.params.placeId);
    if (!Number.isInteger(placeId)) {
      return res.status(400).json({ error: "placeId inválido" });
    }

    conn = await pool.getConnection();

    const [reviews] = await conn.query(
      `SELECT r.id, r.user_id, r.rating, r.title, r.body, r.created_at,
              u.name AS user_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       WHERE r.place_id = ?
       ORDER BY r.created_at DESC`,
      [placeId]
    );

    const [avgRows] = await conn.query(
      `SELECT COUNT(*) AS reviews_count, ROUND(AVG(rating),2) AS avg_rating
       FROM reviews WHERE place_id = ?`,
      [placeId]
    );
    const stats = (avgRows as any[])[0] || { reviews_count: 0, avg_rating: null };

    res.json({ data: reviews, stats });
  } catch (e) {
    console.error("[listReviewsByPlace]", e);
    res.status(500).json({ error: "Error listando reseñas por lugar" });
  } finally {
    if (conn) conn.release();
  }
}

/** POST /api/reviews/place/:placeId — crea una reseña (puedes proteger con auth) */
export async function createReview(req: Request, res: Response) {
  let conn;
  try {
    const placeId = Number(req.params.placeId);
    // En producción, toma user_id del token: (req as any).user.id
    const { user_id, rating, title, body } = req.body as {
      user_id: number;
      rating: number;
      title?: string;
      body?: string;
    };

    if (!Number.isInteger(placeId)) return res.status(400).json({ error: "placeId inválido" });
    if (!Number.isInteger(user_id)) return res.status(400).json({ error: "user_id inválido" });
    if (!(Number.isInteger(rating) && rating >= 1 && rating <= 5)) {
      return res.status(400).json({ error: "rating debe ser 1..5" });
    }

    conn = await pool.getConnection();

    const [[p]]: any = await conn.query("SELECT id FROM places WHERE id = ?", [placeId]);
    if (!p) return res.status(404).json({ error: "Lugar no existe" });

    const [[u]]: any = await conn.query("SELECT id FROM users WHERE id = ?", [user_id]);
    if (!u) return res.status(404).json({ error: "Usuario no existe" });

    await conn.query(
      `INSERT INTO reviews (place_id, user_id, rating, title, body)
       VALUES (?,?,?,?,?)`,
      [placeId, user_id, rating, title ?? null, body ?? null]
    );

    res.status(201).json({ ok: true });
  } catch (e) {
    console.error("[createReview]", e);
    res.status(500).json({ error: "Error creando reseña" });
  } finally {
    if (conn) conn.release();
  }
}
