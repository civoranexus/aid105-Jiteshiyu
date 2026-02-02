import express from "express";
import {
  getProgress,
  updateProgress,
} from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProgress);
router.post("/", protect, updateProgress);

export default router;
