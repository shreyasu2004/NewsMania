const mongoose = require("mongoose");

const HeadlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Headline", HeadlineSchema);
