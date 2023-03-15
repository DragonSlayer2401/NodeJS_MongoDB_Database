const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  actor: String,
});

module.exports = mongoose.model("movie", movieSchema);