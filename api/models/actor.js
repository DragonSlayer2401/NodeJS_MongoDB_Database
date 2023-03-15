const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  movie: String,
});

module.exports = mongoose.model("actor", actorSchema);
