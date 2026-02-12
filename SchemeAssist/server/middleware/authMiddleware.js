import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized: Token missing", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    return next(new AppError("JWT secret not configured", 500));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Session expired. Please login again.", 401));
    }

    return next(new AppError("Invalid token. Access denied.", 401));
  }
};
