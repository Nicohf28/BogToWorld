import { Router } from "express";
import { listPlaces } from "../controllers/places.controller";
import { auth } from "../middleware/auth"; // protegible si lo deseas
const r = Router();
r.get("/", listPlaces);
export default r;
