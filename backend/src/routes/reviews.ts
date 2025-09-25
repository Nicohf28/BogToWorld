import { Router } from "express";
import { listAllReviews, listReviewsByPlace, createReview } from "../controllers/reviews.controller";
// import { auth } from "../middleware/auth"; // si luego proteges POST
const r = Router();

r.get("/", listAllReviews);                  // GET /api/reviews
r.get("/place/:placeId", listReviewsByPlace); // GET /api/reviews/place/:placeId
r.post("/place/:placeId", /* auth, */ createReview);

export default r;
