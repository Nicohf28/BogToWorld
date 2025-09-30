
import { Router } from "express";
import { listMapPlaces } from "../controllers/map.controller";

const r = Router();
r.get("/", listMapPlaces);

export default r;
