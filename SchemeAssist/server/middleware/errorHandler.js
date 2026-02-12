const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid input data";
  }

  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    message = "Something went wrong. Please try again later.";
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
