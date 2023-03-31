import express from "express";
import { GetDataReview } from "../controller/review.controller.js";
import { verify } from "../middleware/authenticate.js";
const router = express.Router();
router.post("/save",verify,GetDataReview)
export default router;