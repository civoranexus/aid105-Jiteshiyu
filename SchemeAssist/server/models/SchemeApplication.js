import mongoose from "mongoose";

const schemeApplicationSchema = new mongoose.Schema({
  schemeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scheme",
    required: true,
    unique: true,
  },

  applicationMode: {
    type: String,
    enum: ["Online", "Offline", "Hybrid"],
    required: true,
  },

  officialPortal: {
    type: String,
    required: true,
  },

  steps: [
    {
      stepNumber: Number,
      description: String,
    },
  ],

  requiredDocuments: [String],

  followUpProcess: {
    type: String,
  },

  source: {
    type: String,
    default: "myscheme.gov.in",
  },
});

export default mongoose.model(
  "SchemeApplication",
  schemeApplicationSchema
);
