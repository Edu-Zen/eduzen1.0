const mongoose = require("mongoose");
const allSchema = new mongoose.Schema({
  email: { type: String, required: false },
  dateOf: { type: Date, required: false },
  nameOf: { type: String, required: false },
  timeOf: { type: Date, required: false },
  categorieOf: { type: String, required: false },
  typeOf: { type: String },
});
const All = mongoose.model("All", allSchema);
module.exports = { All };
