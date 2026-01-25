const User = require("../models/User");

const DEFAULT_EMAIL = "testuser@example.com";
const DEFAULT_PASSWORD = "password123";

exports.register = async (req, res) => {
  try {
    const { name } = req.body;

    const existingUser = await User.findOne({ email: DEFAULT_EMAIL });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const user = await User.create({
      name,
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
    });

    res.json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ email: DEFAULT_EMAIL });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
