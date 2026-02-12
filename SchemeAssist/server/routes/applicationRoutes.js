import express from "express";
import { getApplicationProcess } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:schemeId", protect, getApplicationProcess);

export default router;