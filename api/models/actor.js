const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("actor", actorSchema);
