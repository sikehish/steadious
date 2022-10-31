const mongoose = require("mongoose");
const validator = require("validator");

attnSchema = mongoose.Schema(
  {
    days: {
      type: [String],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      unique: true,
    },
    missed: {
      type: Number,
      min: 0,
      required: true,
    },
    holidays: {
      type: Number,
      min: 0,
      required: true,
    },
    total: {
      type: Number,
      min: 0,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Attn = mongoose.model("Attn", attnSchema);

module.exports = Attn;
