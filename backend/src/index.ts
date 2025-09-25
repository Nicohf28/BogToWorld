import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; 
import authRoutes from "./routes/auth";
import placesRoutes from "./routes/places";
import reviewsRoutes from "./routes/reviews"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "public")) // ./backend/public/*
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/reviews", reviewsRoutes);        

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API en http://localhost:${port}`));