# BogToWorld — Sitios de Interés en Bogotá

Aplicación web (frontend + backend + BD + contenedores) para que ciudadanos y visitantes de **Bogotá, Colombia** descubran sitios turísticos, culturales y recreativos. El proyecto evoluciona desde una **arquitectura de microservicios (v1)** hacia una **versión refactorizada (v2)** con **TypeScript + MySQL + autenticación y favoritos**, preparada para **Docker** y **Kubernetes**. 

> Fuente: Documentación del proyecto “BogToWorld: Sitios de Interés en Bogotá” (30 de septiembre de 2025).

---

## Demo

- **Video (DEMO)**: YouTube — https://www.youtube.com/watch?v=eTdYh2GF0PE

---

## Características clave

- **Catálogo filtrable** por tipo, categoría y búsqueda textual.  
- **Detalle de lugar** con reseñas y calificación promedio.  
- **Autenticación (login / registro)** y **favoritos** (botón de “corazón” visible solo si hay sesión).  
- **Patrones de diseño** en el frontend: **Factory** (tarjetas por tipo de lugar) y **Decorator** (badges “Nuevo”, etc.).  
- **Preparado para contenedores**: Dockerfiles por servicio y manifiestos **K8s** para despliegue orquestado.  
- **Refactor v2**: Migración a **TypeScript**, **React Router**, **manejo explícito de formularios**, **try/catch**, **paginado** e integración **MySQL**. 

---

## Arquitectura (visiones)

### v1 — Microservicios (Node/Express)
- **catalog-service** (puerto **4001**): `/places`, `/types`, `/categories`  
- **reviews-service** (puerto **4002**): `/reviews/:placeId`  
- **frontend** (Vite + React): consume ambos servicios.  

**Pruebas locales**:  
```
Catalog:  http://localhost:4001/places
Reviews:  http://localhost:4002/reviews/r2
Frontend: http://localhost:8080/
```

### v2 — Refactor (TS + MySQL)
- **backend (TypeScript + Express + mysql2/promise)** en **:4000**, con controladores para:
  - **Auth**: `POST /auth/login`, `POST /auth/register`
  - **Favorites** (protegido con middleware): `POST /favorites` (listar), `POST /favorites/add`, `POST /favorites/remove`
  - **Places**: `POST /places` (listado con filtros)
  - **Reviews**: `POST /reviews` (todas), `POST /reviews/place/:placeId`, `POST /reviews/create`
- **frontend (TS + React Router)** con **Layouts** (público vs. con Navbar/Footer), **pages** (Home, Places, Reviews, Favorites, Login, Register) y **componentes** (Factory/Decorator).  
- **Base de datos MySQL** con **schema** y **seeds** (`Sql/`).  

> **Nota**: La documentación describe ambas etapas (v1 microservicios y v2 refactor). Ajusta este README según la rama/estado actual del repo.

---

## Estructura del repositorio

```
/backend            # API REST en TypeScript (Express, rutas, controladores, middleware, pool MySQL)
/frontend           # App React + Vite (TS). Layouts, pages, context de auth, servicios axios
/Sql                # schema.sql, seed_places.sql, seed_reviews.sql
/Docker             # Dockerfile.backend, Dockerfile.frontend, nginx.conf
/k8s                # Manifiestos Kubernetes (mysql, backend, frontend, ingress, etc.)
docker-compose.yml  # Levante orquestado (DB + backend + frontend)
```

---

## Requisitos previos

- **Node.js** (entorno de desarrollo y para construir imágenes)  
- **MySQL** (local o en contenedor)  
- **Docker Desktop** (con **Kubernetes** habilitado si deseas orquestación local)  
- **Git** y **VS Code** (recomendado)  

---

## Variables de entorno

**Frontend (Vite)**  
- `VITE_CATALOG_API` y `VITE_REVIEWS_API` (v1)  
- En v2, el frontend consume el **backend** unificado.  
> Buenas prácticas: no commitear `.env` (agregar a `.gitignore`).  

**Backend (TS)**  
- Credenciales y DSN para **MySQL** (gestionadas con `dotenv`).  

---

## Puesta en marcha

### Opción A — Desarrollo local (sin contenedores)

1) **Instalar dependencias**
```bash
# en la raíz, o por paquete
cd frontend && npm install
cd ../backend && npm install
```

2) **Base de datos**
- Crear BD con `Sql/schema.sql` e importar `seed_places.sql` y `seed_reviews.sql`.  
- Configurar credenciales en `.env` del **backend**.  

3) **Levantar servicios**
```bash
# backend (TypeScript)
cd backend
npm run dev  # expone :4000

# frontend
cd ../frontend
npm run dev  # Vite en :5173 (o el que asigne)
```

---

### Opción B — Docker (imágenes individuales)

**v1 microservicios** (ejemplo de comandos descritos):
```bash
# Catalog-Service
docker build -f Dockerfile.catalog -t catalog-service:1.0 .
docker run -d -p 4001:4001 --name catalog-service catalog-service:1.0

# Reviews-Service
docker build -f Dockerfile.reviews -t reviews-service:1.0 .
docker run -d -p 4002:4002 --name reviews-service reviews-service:1.0

# Frontend (pasando args de build para Vite)
docker build -f Dockerfile.frontend -t frontend-prod:1.0   --build-arg VITE_CATALOG_API=http://host.docker.internal:4001   --build-arg VITE_REVIEWS_API=http://host.docker.internal:4002 .
docker run -d -p 8080:5173 --name frontend-prod frontend-prod:1.0
```

---

### Opción C — Docker Compose / Kubernetes

**Docker Compose**
```bash
docker compose build
docker compose up -d
```

**Kubernetes (Docker Desktop habilitado)**
```bash
# aplicar todos los manifiestos
kubectl apply -f k8s/
kubectl get pods
kubectl get services
```
> El clúster local de Docker Desktop expone **NodePorts** a `localhost`, facilitando pruebas desde el navegador.

---

## Endpoints (resumen)

### v1 — Microservicios
- `GET /places?type=&category=&q=` (4001)  
- `GET /types` (4001)  
- `GET /categories` (4001)  
- `GET /reviews/:placeId` (4002)  

### v2 — Backend TS (ejemplos)
- **Auth**: `POST /auth/login`, `POST /auth/register`  
- **Favorites** (con token): `POST /favorites` · `POST /favorites/add` · `POST /favorites/remove`  
- **Places**: `POST /places`  
- **Reviews**: `POST /reviews` · `POST /reviews/place/:placeId` · `POST /reviews/create`  

---

## Frontend

- **React + Vite (TS)** con **React Router** y **Context de Autenticación**.  
- **Factory Method** para generar `PlaceCard` según categoría (Restaurant, Natural Park, etc.).  
- **Decorator (HOC)** para superponer badges (p. ej., “Nuevo”).  
- **UI** con Navbar, Breadcrumbs, Category Rail, Footer y páginas de Soporte/FAQ/Términos/Privacidad/Reportes.  
- **Botón de Favoritos** (corazón) visible solo si `isAuth === true`.  

---

## Base de datos

- Scripts en `Sql/`: **`schema.sql`**, **`seed_places.sql`**, **`seed_reviews.sql`**.  
- Capa de acceso vía `mysql2/promise`, **pool de conexiones**, controladores `places`, `reviews`, `favorites`.  

---

## Calidad y seguridad

- **ESLint** configurado en el frontend.  
- **.env** y secretos **excluidos** de control de versiones.  
- Manejo de errores con **try/catch/finally** en el refactor.  

---

## Roadmap a seguir en debate

- Panel de **administración** (CRUD de lugares y moderación de reseñas).  
- **Mapas** y rutas.  
- **Internacionalización** (ES/EN).  
- **Pruebas** unitarias e integrales.  
- Pipeline **CI/CD**.  

---

## Cómo contribuir

1. Crea una rama a partir de `main`.  
2. Sigue las guías de estilo (ESLint/Prettier en frontend; TS estricto en backend).  
3. Abre un PR describiendo cambios, pruebas y pasos de verificación.  

---

## Autores y crédito

Equipo de la **Universidad Libre de Colombia – Seccional Bogotá** (Arquitectura de la Información / Programación Web).
- Dana Valeria Urquijo Ospitia
- Daniel Esteban Mora Rodríguez
- Juan David Castro
- Karen Sofía Rueda Piñeros
- Mayra Alejandra Salamanca Chaves
- Nicolás Hernández Flórez
- Osmar Santiago Aguirre Durán
- Thomas Alejandro Jutiníco Jaramillo
---

## Fuente principal

Toda la información anterior proviene de la **documentación del proyecto “BogToWorld: Sitios de Interés en Bogotá”** (30 de septiembre de 2025).

- Google Drive: https://drive.google.com/file/d/1mq6z-TE9f70NbuHl95vkTaHsPFFSA4W4/view?usp=sharing
