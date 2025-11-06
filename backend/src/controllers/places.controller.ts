import type { Request, Response } from "express";
import { pool } from "../db/pool";
import type { RowDataPacket } from "mysql2/promise";

type CountRow = RowDataPacket & { total: number };
type PlaceRow = RowDataPacket & {
  id: number;
  name: string;
  description: string | null;
  category: string;
  address: string | null;
  image_url: string | null;
  is_new: 0 | 1;
};

export async function listPlaces(req: Request, res: Response) {
  let conn;
  try {
    const { q = "", category = "", page = "1", pageSize = "8", is_new = "" } =
      req.query as Record<string, string>;

    const pageNum = Math.max(1, Number(page) || 1);
    const sizeNum = Math.max(1, Number(pageSize) || 8);
    const offset = (pageNum - 1) * sizeNum;

    const params: any[] = [];
    const where: string[] = [];

    if (q) {
      where.push("(name LIKE ? OR description LIKE ?)");
      params.push(`%${q}%`, `%${q}%`);
    }
    if (category) {
      where.push("category = ?");
      params.push(category);
    }
    if (is_new === "1") {
      where.push("is_new = 1");
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    conn = await pool.getConnection();

    // 1) total
    const [countRows] = await conn.query<CountRow[]>(
      `SELECT COUNT(*) AS total FROM places ${whereSql}`,
      params
    );
    const total = countRows[0]?.total ?? 0;

    // 2) datos con orden determinista
    const [rows] = await conn.query<PlaceRow[]>(
      `SELECT id, name, description, category, address, image_url, is_new
       FROM places
       ${whereSql}
       ORDER BY created_at DESC, id ASC
       LIMIT ? OFFSET ?`,
      [...params, sizeNum, offset]
    );

    res.json({ data: rows, page: pageNum, pageSize: sizeNum, total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudieron listar los lugares" });
  } finally {
    if (conn) conn.release();
  }
}
