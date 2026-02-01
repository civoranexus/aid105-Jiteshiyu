import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToWatchlist);
router.delete("/:schemeId", protect, removeFromWatchlist);
router.get("/", protect, getWatchlist);

export default router;
