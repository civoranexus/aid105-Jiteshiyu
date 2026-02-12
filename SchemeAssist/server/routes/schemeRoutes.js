import express from "express";
import {
  getSchemes,
  syncSchemes,
} from "../controllers/schemeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSchemes);

router.post("/sync", protect, syncSchemes);

export default router;
