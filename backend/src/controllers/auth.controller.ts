import { Request, Response } from "express";
import { pool } from "../db/pool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  let conn;
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Faltan campos" });

    conn = await pool.getConnection();
    const [exists] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((exists as any[]).length > 0) return res.status(409).json({ error: "Email ya registrado" });

    const hash = await bcrypt.hash(password, 10);
    await conn.query("INSERT INTO users(name,email,password_hash) VALUES (?,?,?)", [name, email, hash]);

    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error en registro" });
  } finally {
    if (conn) conn.release();
  }
}

export async function login(req: Request, res: Response) {
  let conn;
  try {
    const { email, password } = req.body;
    conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT id, password_hash FROM users WHERE email = ?", [email]);
    const user = (rows as any[])[0];
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error en login" });
  } finally {
    if (conn) conn.release();
  }
}
