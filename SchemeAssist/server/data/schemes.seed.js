import mongoose from "mongoose";
import dotenv from "dotenv";
import Scheme from "../models/Scheme.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

await Scheme.deleteMany();

await Scheme.insertMany([
  {
    name: "Pradhan Mantri Awas Yojana",
    description: "Housing assistance for economically weaker sections.",
    targetGroup: "Low-income families",
    eligibility: {
      incomeRange: "Below ₹6 lakh",
      category: "EWS/LIG",
      location: "India",
    },
    benefits: "Subsidized home loans",
    officialLink: "https://pmay.gov.in",
  },
  {
    name: "Pradhan Mantri Ujjwala Yojana",
    description: "Free LPG connections for women from BPL households.",
    targetGroup: "Women",
    eligibility: {
      incomeRange: "BPL families",
      occupation: "Household",
      location: "India",
    },
    benefits: "Free LPG connection",
    officialLink: "https://www.pmuy.gov.in",
  },
]);

console.log("Schemes seeded successfully");
process.exit();
