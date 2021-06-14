export {};
const mongoose = require("mongoose");
const stepSchema = new mongoose.Schema(
  {
      cid: String,
      task_data : []
  },
  {
    timestamps: true,
  }
);
const Step = mongoose.model("Step", stepSchema);
module.exports = Step;
