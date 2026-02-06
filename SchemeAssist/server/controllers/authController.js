const User = require("../models/User");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const DEFAULT_EMAIL = "testuser@example.com";
const DEFAULT_PASSWORD = "password123";

exports.register = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return next(new AppError("Name is required", 400));
  }

  const existingUser = await User.findOne({ email: DEFAULT_EMAIL });

  if (existingUser) {
    return next(new AppError("User already registered", 400));
  }

  const user = await User.create({
    name,
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
    return next(new AppError("Invalid credentials", 401));
  }

  const user = await User.findOne({ email: DEFAULT_EMAIL });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
});
