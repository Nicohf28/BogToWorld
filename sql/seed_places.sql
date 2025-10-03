USE bogtoworld;

INSERT INTO places (name, description, category, address, image_url, is_new) VALUES
-- Restaurantes
('Andrés DC', 'Restaurante icónico de comida colombiana y show en vivo.', 'Restaurantes', NULL, NULL, 1),
('El Chato', 'Restaurante de alta cocina contemporánea liderado por Álvaro Clavijo.', 'Restaurantes', NULL, NULL, 0),
('Leo', 'Propuesta de cocina colombiana de autor de Leonor Espinosa.', 'Restaurantes', NULL, NULL, 0),

-- Parques Naturales
('Parque Simón Bolívar', 'El parque urbano más grande de Bogotá, lagos y zonas verdes.', 'Parques Naturales', NULL, NULL, 0),
('Parque Nacional Enrique Olaya Herrera', 'Histórico pulmón verde con senderos y canchas.', 'Parques Naturales', NULL, NULL, 0),
('Jardín Botánico de Bogotá', 'Colecciones de flora andina y jardines temáticos.', 'Parques Naturales', NULL, NULL, 1),

-- Parques de Diversiones
('Salitre Mágico', 'Parque de atracciones con montañas rusas y juegos familiares.', 'Parques de Diversiones', NULL, NULL, 1),
('Mundo Aventura', 'Parque con atracciones mecánicas y áreas temáticas para familias.', 'Parques de Diversiones', NULL, NULL, 0),
('Multiparque', 'Entretenimiento al aire libre con karts, muros de escalar y más.', 'Parques de Diversiones', NULL, NULL, 0),

-- Zonas de Juegos
('Chuck E. Cheese Bogotá', 'Centro de juegos infantiles, pizza y shows animatrónicos.', 'Zonas de Juegos', NULL, NULL, 0),
('Playland Unicentro', 'Arcade y atracciones para niños dentro del centro comercial.', 'Zonas de Juegos', NULL, NULL, 0),
('Mundo Aventura Kids', 'Zona infantil con juegos interactivos y atracciones suaves.', 'Zonas de Juegos', NULL, NULL, 1),

-- Centros Comerciales
('Centro Comercial Andino', 'Centro comercial premium en la Zona T.', 'Centros Comerciales', NULL, NULL, 0),
('Gran Estación', 'Centro comercial amplio junto al complejo de Salitre.', 'Centros Comerciales', NULL, NULL, 0),
('Unicentro Bogotá', 'Histórico centro comercial con múltiples servicios y entretenimiento.', 'Centros Comerciales', NULL, NULL, 1),

-- Piscinas
('Complejo Acuático Simón Bolívar', 'Piscinas olímpicas y recreativas en el Parque Metropolitano.', 'Piscinas', NULL, NULL, 0),
('Centro de Alto Rendimiento (CAR) - Piscinas', 'Escenarios acuáticos para entrenamiento y eventos.', 'Piscinas', NULL, NULL, 0),
('Compensar Av. 68 - Piscinas', 'Complejo recreodeportivo con piscinas para cursos y uso libre.', 'Piscinas', NULL, NULL, 1),

-- Boleras
('Bowling Star Unicentro', 'Bolera dentro de Unicentro con pistas y snacks.', 'Boleras', NULL, NULL, 0),
('Strike Bowling Parque La Colina', 'Pistas modernas, bar y juegos en C.C. Parque La Colina.', 'Boleras', NULL, NULL, 1),
('Bolera El Salitre', 'Bolera tradicional en la zona de Salitre.', 'Boleras', NULL, NULL, 0),

-- Canchas de Futbol
('Canchas Sintéticas El Campín', 'Canchas recreativas cercanas al estadio Nemesio Camacho El Campín.', 'Canchas de Futbol', NULL, NULL, 0),
('Canchas de Fútbol Parque Simón Bolívar', 'Canchas públicas en el complejo del parque.', 'Canchas de Futbol', NULL, NULL, 0),
('Compensar Canchas de Fútbol', 'Canchas sintéticas para arriendo y torneos recreativos.', 'Canchas de Futbol', NULL, NULL, 1),

-- Miradores
('Monserrate', 'Mirador emblemático con vista panorámica de Bogotá.', 'Miradores', NULL, NULL, 1),
('Cerro de Guadalupe', 'Mirador alto con santuario y vista de la ciudad.', 'Miradores', NULL, NULL, 0),
('Mirador La Calera', 'Puntos panorámicos en la vía a La Calera con vista nocturna.', 'Miradores', NULL, NULL, 0),

-- Iglesias
('Catedral Primada de Bogotá', 'Catedral neoclásica en la Plaza de Bolívar.', 'Iglesias', NULL, NULL, 0),
('Iglesia de San Francisco', 'Templo colonial con retablos barrocos en el centro.', 'Iglesias', NULL, NULL, 0),
('Santuario del Señor Caído de Monserrate', 'Basílica en la cima del cerro de Monserrate.', 'Iglesias', NULL, NULL, 1),

-- Museos
('Museo del Oro', 'Colección de orfebrería prehispánica del Banco de la República.', 'Museos', NULL, NULL, 1),
('Museo Botero', 'Obras de Fernando Botero y colección internacional.', 'Museos', NULL, NULL, 0),
('Museo Nacional de Colombia', 'Museo más antiguo del país con arte e historia.', 'Museos', NULL, NULL, 0);

-- ***** RESTAURANTES *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/andres-dc.jpg' WHERE name = 'Andrés DC';
UPDATE places SET image_url = 'http://localhost:4000/static/places/el-chato.jpg' WHERE name = 'El Chato';
UPDATE places SET image_url = 'http://localhost:4000/static/places/leo-restaurante.jpg' WHERE name = 'Leo';

-- ***** PARQUES NATURALES *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/parque-simon-bolivar.jpg' WHERE name = 'Parque Simón Bolívar';
UPDATE places SET image_url = 'http://localhost:4000/static/places/parque-nacional-olaya.jpg' WHERE name = 'Parque Nacional Enrique Olaya Herrera';
UPDATE places SET image_url = 'http://localhost:4000/static/places/jardin-botanico.jpg' WHERE name = 'Jardín Botánico de Bogotá';

-- ***** PARQUES DE DIVERSIONES *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/salitre-magico.jpg' WHERE name = 'Salitre Mágico';
UPDATE places SET image_url = 'http://localhost:4000/static/places/mundo-aventura.jpg' WHERE name = 'Mundo Aventura';
UPDATE places SET image_url = 'http://localhost:4000/static/places/multiparque.jpg' WHERE name = 'Multiparque';

-- ***** ZONAS DE JUEGOS *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/chuck-e-cheese.jpg' WHERE name = 'Chuck E. Cheese Bogotá';
UPDATE places SET image_url = 'http://localhost:4000/static/places/playland-unicentro.jpg' WHERE name = 'Playland Unicentro';
UPDATE places SET image_url = 'http://localhost:4000/static/places/mundo-aventura-kids.jpg' WHERE name = 'Mundo Aventura Kids';

-- ***** CENTROS COMERCIALES *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/cc-andino.jpg' WHERE name = 'Centro Comercial Andino';
UPDATE places SET image_url = 'http://localhost:4000/static/places/gran-estacion.jpg' WHERE name = 'Gran Estación';
UPDATE places SET image_url = 'http://localhost:4000/static/places/unicentro-bogota.jpg' WHERE name = 'Unicentro Bogotá';

-- ***** PISCINAS *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/complejo-acuatico-simon-bolivar.jpg' WHERE name = 'Complejo Acuático Simón Bolívar';
UPDATE places SET image_url = 'http://localhost:4000/static/places/car-piscinas.jpg' WHERE name = 'Centro de Alto Rendimiento (CAR) - Piscinas';
UPDATE places SET image_url = 'http://localhost:4000/static/places/compensar-68-piscinas.jpg' WHERE name = 'Compensar Av. 68 - Piscinas';

-- ***** BOLERAS *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/bowling-star-unicentro.jpg' WHERE name = 'Bowling Star Unicentro';
UPDATE places SET image_url = 'http://localhost:4000/static/places/strike-bowling-parque-la-colina.jpg' WHERE name = 'Strike Bowling Parque La Colina';
UPDATE places SET image_url = 'http://localhost:4000/static/places/bolera-el-salitre.jpg' WHERE name = 'Bolera El Salitre';

-- ***** CANCHAS DE FUTBOL *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/canchas-el-campin.jpg' WHERE name = 'Canchas Sintéticas El Campín';
UPDATE places SET image_url = 'http://localhost:4000/static/places/canchas-parque-simon-bolivar.jpg' WHERE name = 'Canchas de Fútbol Parque Simón Bolívar';
UPDATE places SET image_url = 'http://localhost:4000/static/places/compensar-canchas-futbol.jpg' WHERE name = 'Compensar Canchas de Fútbol';

-- ***** MIRADORES *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/monserrate.jpg' WHERE name = 'Monserrate';
UPDATE places SET image_url = 'http://localhost:4000/static/places/cerro-guadalupe.jpg' WHERE name = 'Cerro de Guadalupe';
UPDATE places SET image_url = 'http://localhost:4000/static/places/mirador-la-calera.jpg' WHERE name = 'Mirador La Calera';

-- ***** IGLESIAS *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/catedral-primada.jpg' WHERE name = 'Catedral Primada de Bogotá';
UPDATE places SET image_url = 'http://localhost:4000/static/places/iglesia-san-francisco.jpg' WHERE name = 'Iglesia de San Francisco';
UPDATE places SET image_url = 'http://localhost:4000/static/places/santuario-monserrate.jpg' WHERE name = 'Santuario del Señor Caído de Monserrate';

-- ***** MUSEOS *****
UPDATE places SET image_url = 'http://localhost:4000/static/places/museo-del-oro.jpg' WHERE name = 'Museo del Oro';
UPDATE places SET image_url = 'http://localhost:4000/static/places/museo-botero.jpg' WHERE name = 'Museo Botero';
UPDATE places SET image_url = 'http://localhost:4000/static/places/museo-nacional.jpg' WHERE name = 'Museo Nacional de Colombia';

-- Seteo de direcciones de los lugares
UPDATE places SET address='Cl. 82 #12-21, Zona T' WHERE id=1;  -- Andrés DC
UPDATE places SET address='Cra. 3 #65-28, Chapinero' WHERE id=2;  -- El Chato
UPDATE places SET address='Cl. 27 #6-75, Centro Internacional' WHERE id=3;  -- Leo
UPDATE places SET address='Av. Calle 63 y Av. 68, Teusaquillo' WHERE id=4;  -- Parque Simón Bolívar
UPDATE places SET address='Cra. 7 #36-45, Santa Fe' WHERE id=5;  -- Parque Nacional Enrique Olaya Herrera
UPDATE places SET address='Cl. 63 #68-95, Engativá' WHERE id=6;  -- Jardín Botánico de Bogotá
UPDATE places SET address='Cra. 68 #63-63, Barrios Unidos' WHERE id=7;  -- Salitre Mágico
UPDATE places SET address='Cra. 71D #1-14 Sur, Kennedy' WHERE id=8;  -- Mundo Aventura
UPDATE places SET address='Autopista Norte #224-60, Suba' WHERE id=9;  -- Multiparque
UPDATE places SET address='Cl. 26 #62-47, Teusaquillo' WHERE id=10; -- Chuck E. Cheese Bogotá
UPDATE places SET address='Cra. 15 #124-30, Usaquén' WHERE id=11; -- Playland Unicentro
UPDATE places SET address='Cra. 71D #1-14 Sur, Kennedy' WHERE id=12; -- Mundo Aventura Kids
UPDATE places SET address='Cra. 11 #82-71, Zona T' WHERE id=13; -- Centro Comercial Andino
UPDATE places SET address='Cl. 26 #62-47, Fontibón' WHERE id=14; -- Gran Estación
UPDATE places SET address='Cra. 15 #124-30, Usaquén' WHERE id=15; -- Unicentro Bogotá
UPDATE places SET address='Av. Calle 63 #47-06, Teusaquillo' WHERE id=16; -- Complejo Acuático Simón Bolívar
UPDATE places SET address='Cra. 60 #63-65, Teusaquillo' WHERE id=17; -- Centro de Alto Rendimiento
UPDATE places SET address='Av. 68 #49A-47, Barrios Unidos' WHERE id=18; -- Compensar Av. 68 Piscinas
UPDATE places SET address='Cra. 15 #124-30, Usaquén' WHERE id=19; -- Bowling Star Unicentro
UPDATE places SET address='Cl. 146 #58-39, Suba' WHERE id=20; -- Strike Bowling Parque La Colina
UPDATE places SET address='Av. 68 #55-65, Barrios Unidos' WHERE id=21; -- Bolera El Salitre
UPDATE places SET address='Cl. 57 #28-00, Teusaquillo' WHERE id=22; -- Canchas El Campín
UPDATE places SET address='Av. Calle 63 y Av. 68, Teusaquillo' WHERE id=23; -- Canchas Parque Simón Bolívar
UPDATE places SET address='Av. 68 #49A-47, Barrios Unidos' WHERE id=24; -- Compensar Canchas de Fútbol
UPDATE places SET address='Cra. 2 Este #21-48, Santa Fe' WHERE id=25; -- Monserrate
UPDATE places SET address='Cra. 2 Este #20-00, Santa Fe' WHERE id=26; -- Cerro de Guadalupe
UPDATE places SET address='Vía La Calera Km 7, La Calera' WHERE id=27; -- Mirador La Calera
UPDATE places SET address='Cra. 7 #11-10, La Candelaria' WHERE id=28; -- Catedral Primada
UPDATE places SET address='Cra. 7 #9-70, La Candelaria' WHERE id=29; -- Iglesia de San Francisco
UPDATE places SET address='Cra. 2 Este #21-48, Santa Fe' WHERE id=30; -- Santuario del Señor Caído de Monserrate
UPDATE places SET address='Cra. 6 #15-88, La Candelaria' WHERE id=31; -- Museo del Oro
UPDATE places SET address='Cl. 11 #4-41, La Candelaria' WHERE id=32; -- Museo Botero
UPDATE places SET address='Cra. 7 #28-66, Santa Fe' WHERE id=33; -- Museo Nacional de Colombia
