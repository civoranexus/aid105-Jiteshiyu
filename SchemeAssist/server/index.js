import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "SchemeAssist API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/compare", comparisonRoutes);
app.use("/api/watchlist", watchlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});