USE bogtoworld;

-- Usuarios demo (si ya existen por email, los actualiza sin duplicar)
INSERT INTO users (name, email, password_hash)
VALUES
  ('Ana Demo', 'ana@bogtoworld.com', '$2b$10$demo'),
  ('Luis Demo', 'luis@bogtoworld.com', '$2b$10$demo'),
  ('Carla Demo', 'carla@bogtoworld.com', '$2b$10$demo')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Helper: devuelve id de usuario por email
-- (usamos subconsultas directo en cada INSERT de reviews)

-- ***** RESTAURANTES *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Imperdible', 'Ambiente y comida espectaculares.'
FROM places p, users u
WHERE p.name = 'Andrés DC' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Creativo', 'Propuesta gastronómica distinta.'
FROM places p, users u
WHERE p.name = 'El Chato' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Experiencia', 'Sabores colombianos con técnica.'
FROM places p, users u
WHERE p.name = 'Leo' AND u.email = 'carla@bogtoworld.com';

-- ***** PARQUES NATURALES *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Perfecto para picnic', 'Áreas verdes enormes.'
FROM places p, users u
WHERE p.name = 'Parque Simón Bolívar' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Tradicional', 'Ideal para caminar en la ciudad.'
FROM places p, users u
WHERE p.name = 'Parque Nacional Enrique Olaya Herrera' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Hermoso', 'Colecciones botánicas imperdibles.'
FROM places p, users u
WHERE p.name = 'Jardín Botánico de Bogotá' AND u.email = 'carla@bogtoworld.com';

-- ***** PARQUES DE DIVERSIONES *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Adrenalina', 'Montañas rusas muy buenas.'
FROM places p, users u
WHERE p.name = 'Salitre Mágico' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Familiar', 'Varias atracciones para niños.'
FROM places p, users u
WHERE p.name = 'Mundo Aventura' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Aire libre', 'Planes variados, karts y más.'
FROM places p, users u
WHERE p.name = 'Multiparque' AND u.email = 'carla@bogtoworld.com';

-- ***** ZONAS DE JUEGOS *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Para niños', 'Los pequeños se divierten mucho.'
FROM places p, users u
WHERE p.name = 'Chuck E. Cheese Bogotá' AND u.email = 'carla@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Arcades', 'Buen plan después de hacer compras.'
FROM places p, users u
WHERE p.name = 'Playland Unicentro' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Top para peques', 'Atracciones suaves y seguras.'
FROM places p, users u
WHERE p.name = 'Mundo Aventura Kids' AND u.email = 'luis@bogtoworld.com';

-- ***** CENTROS COMERCIALES *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Premium', 'Buenos restaurantes y tiendas.'
FROM places p, users u
WHERE p.name = 'Centro Comercial Andino' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Amplio', 'Cerca a múltiples atracciones del Salitre.'
FROM places p, users u
WHERE p.name = 'Gran Estación' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Clásico', 'Muy completo y cómodo para ir en familia.'
FROM places p, users u
WHERE p.name = 'Unicentro Bogotá' AND u.email = 'carla@bogtoworld.com';

-- ***** PISCINAS *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Deportivas', 'Buenas para entrenar y recreación.'
FROM places p, users u
WHERE p.name = 'Complejo Acuático Simón Bolívar' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Alto rendimiento', 'Excelentes escenarios de práctica.'
FROM places p, users u
WHERE p.name = 'Centro de Alto Rendimiento (CAR) - Piscinas' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Muy divertido', 'Ideal para planes en familia.'
FROM places p, users u
WHERE p.name = 'Compensar Av. 68 - Piscinas' AND u.email = 'carla@bogtoworld.com';

-- ***** BOLERAS *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Plan con amigos', 'Pistas y snacks.'
FROM places p, users u
WHERE p.name = 'Bowling Star Unicentro' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Moderna', 'Buena música y ambiente.'
FROM places p, users u
WHERE p.name = 'Strike Bowling Parque La Colina' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 3, 'Tradicional', 'Bien para pasar el rato.'
FROM places p, users u
WHERE p.name = 'Bolera El Salitre' AND u.email = 'carla@bogtoworld.com';

-- ***** CANCHAS DE FUTBOL *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Excelente', 'Buenas canchas cerca al estadio.'
FROM places p, users u
WHERE p.name = 'Canchas Sintéticas El Campín' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Públicas', 'Cumplen para juegos recreativos.'
FROM places p, users u
WHERE p.name = 'Canchas de Fútbol Parque Simón Bolívar' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Bien mantenidas', 'Fácil de reservar.'
FROM places p, users u
WHERE p.name = 'Compensar Canchas de Fútbol' AND u.email = 'carla@bogtoworld.com';

-- ***** MIRADORES *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Vista top', 'Atardecer espectacular.'
FROM places p, users u
WHERE p.name = 'Monserrate' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Alto', 'Panorámica muy amplia.'
FROM places p, users u
WHERE p.name = 'Cerro de Guadalupe' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Noche', 'Vista nocturna increíble.'
FROM places p, users u
WHERE p.name = 'Mirador La Calera' AND u.email = 'carla@bogtoworld.com';

-- ***** IGLESIAS *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Arquitectura', 'Hermosa catedral en la Plaza de Bolívar.'
FROM places p, users u
WHERE p.name = 'Catedral Primada de Bogotá' AND u.email = 'carla@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Histórica', 'Retablos impresionantes.'
FROM places p, users u
WHERE p.name = 'Iglesia de San Francisco' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Devoción', 'Experiencia espiritual en la cima.'
FROM places p, users u
WHERE p.name = 'Santuario del Señor Caído de Monserrate' AND u.email = 'luis@bogtoworld.com';

-- ***** MUSEOS *****
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Oro', 'Colección única en el mundo.'
FROM places p, users u
WHERE p.name = 'Museo del Oro' AND u.email = 'ana@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 5, 'Botero', 'Obras imperdibles.'
FROM places p, users u
WHERE p.name = 'Museo Botero' AND u.email = 'luis@bogtoworld.com';
INSERT INTO reviews (place_id, user_id, rating, title, body)
SELECT p.id, u.id, 4, 'Historia', 'Recorrido bien curado.'
FROM places p, users u
WHERE p.name = 'Museo Nacional de Colombia' AND u.email = 'carla@bogtoworld.com';
