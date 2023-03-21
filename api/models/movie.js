const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  actor: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movie", movieSchema);
