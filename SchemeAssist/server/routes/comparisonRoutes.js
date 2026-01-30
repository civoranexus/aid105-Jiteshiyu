import express from "express";
import { compareSchemes } from "../controllers/comparisonController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, compareSchemes);

export default router;
