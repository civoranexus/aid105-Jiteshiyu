import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/compare", comparisonRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/feedback", feedbackRoutes);

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("🔥 UNHANDLED REJECTION:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});
