const { Schema, model } = require("mongoose");

const RelatoSchema = new Schema(
  {
    author: { type: String, required: true },
    type: { type: String, required: true },
    story: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Relatos", RelatoSchema);
