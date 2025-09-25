-- Proyecto: BogToWorld
-- Base de datos MySQL compatible con XAMPP (utf8mb4)

-- 1) Crear BD y seleccionar
CREATE DATABASE IF NOT EXISTS bogtoworld
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE bogtoworld;

-- 2) Tabla de usuarios (para login/register y reseñas)
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 3) Tabla de lugares (sitios de interés)
--    Incluye bandera is_new para aplicar el patrón Decorator ("NUEVO")
--    Se define un ENUM con las categorías solicitadas
CREATE TABLE IF NOT EXISTS places (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT NULL,
  category ENUM(
    'Restaurantes',
    'Parques Naturales',
    'Parques de Diversiones',
    'Zonas de Juegos',
    'Centros Comerciales',
    'Piscinas',
    'Boleras',
    'Canchas de Futbol',
    'Miradores',
    'Iglesias',
    'Museos'
  ) NOT NULL,
  address VARCHAR(255) NULL,
  city VARCHAR(100) NOT NULL DEFAULT 'Bogotá',
  image_url VARCHAR(500) NULL,
  is_new TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  -- índices útiles para búsquedas y listados
  INDEX idx_places_category (category),
  INDEX idx_places_created_at (created_at),
  FULLTEXT KEY ftx_places_name_desc (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 4) Tabla de reseñas (reviews) de los lugares
--    Cada reseña pertenece a un lugar y a un usuario
--    rating: 1..5 (CHECK requiere MySQL 8+)
CREATE TABLE IF NOT EXISTS reviews (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  place_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  title VARCHAR(150) NULL,
  body TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_place
    FOREIGN KEY (place_id) REFERENCES places(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_reviews_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chk_reviews_rating_range
    CHECK (rating BETWEEN 1 AND 5),
  -- evitar múltiples reseñas duplicadas exactas por usuario/lugar
  INDEX idx_reviews_place (place_id),
  INDEX idx_reviews_user (user_id),
  INDEX idx_reviews_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 5) Vista opcional: promedio de calificación por lugar (útil en listados)
--    Si tu versión de MySQL no soporta CHECK/VISTAS, puedes comentar esta parte.
CREATE OR REPLACE VIEW place_ratings AS
SELECT
  p.id AS place_id,
  p.name,
  p.category,
  COUNT(r.id) AS reviews_count,
  ROUND(AVG(r.rating), 2) AS avg_rating
FROM places p
LEFT JOIN reviews r ON r.place_id = p.id
GROUP BY p.id, p.name, p.category;