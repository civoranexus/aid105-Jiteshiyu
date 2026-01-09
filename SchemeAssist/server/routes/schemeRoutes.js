import express from "express";
import { getAllSchemes } from "../controllers/schemeController.js";

const router = express.Router();

router.get("/", getAllSchemes);

export default router;
