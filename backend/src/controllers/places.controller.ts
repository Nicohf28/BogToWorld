import { Request, Response } from "express";
import { pool } from "../db/pool";

export async function listPlaces(req: Request, res: Response) {
  let conn;
  try {
    const { q = "", category = "", page = "1", pageSize = "8", is_new = "" } = req.query as Record<string,string>;
    const offset = (Number(page) - 1) * Number(pageSize);
    const params: any[] = [];
    const where: string[] = [];

    if (q) { where.push("(name LIKE ? OR description LIKE ?)"); params.push(`%${q}%`, `%${q}%`); }
    if (category) { where.push("category = ?"); params.push(category); }
    if (is_new === "1") { where.push("is_new = 1"); }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    conn = await pool.getConnection();
    const [countRows] = await conn.query(`SELECT COUNT(*) as total FROM places ${whereSql}`, params);
    const total = (countRows as any[])[0].total;

    const [rows] = await conn.query(
      `SELECT id,name,description,category,address,image_url,is_new
       FROM places ${whereSql}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, Number(pageSize), offset]
    );
    res.json({ data: rows, page: Number(page), pageSize: Number(pageSize), total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudieron listar los lugares" });
  } finally {
    if (conn) conn.release();
  }
}
