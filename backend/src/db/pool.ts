// backend/src/db/pool.ts
import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

/** Lee una variable obligatoria o lanza un error (narrowing a string) */
function required(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return v;
}

/** Lee una variable numérica con default y validación básica */
function asNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return fallback;
  const n = Number(raw);
  if (Number.isNaN(n)) {
    throw new Error(`La variable ${name} debe ser numérica. Valor actual: "${raw}"`);
  }
  return n;
}

const MYSQL_HOST = required("MYSQL_HOST");
const MYSQL_USER = required("MYSQL_USER");
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? ""; // puede ser vacío en XAMPP
const MYSQL_DATABASE = required("MYSQL_DATABASE");
const MYSQL_PORT = asNumber("MYSQL_PORT", 3306);

export const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  connectionLimit: 10,
  charset: "utf8mb4",
});

(async () => {
  const conn = await pool.getConnection();
  await conn.query("SET NAMES utf8mb4");
  conn.release();
})().catch(console.error);