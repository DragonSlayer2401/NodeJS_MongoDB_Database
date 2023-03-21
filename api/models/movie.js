const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Actor",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movie", movieSchema);
