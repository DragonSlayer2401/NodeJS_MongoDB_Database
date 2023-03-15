const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/movie");

router.get("/", (req, res, next) => {
  Movie.find({})
    .then((result) => {
      res.status(200).json({
        message: "Retrieved Movies",
        movies: result,
        metadata: {
          method: req.method,
          host: req.hostname,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.get("/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((result) => {
      res.status(200).json({
        message: `Retrieved Movie`,
        movie: result,
        metadata: {
          method: req.method,
          host: req.hostname,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.post("/", (req, res, next) => {
  const newMovie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    actor: req.body.actor,
  });

  newMovie
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Movie Saved",
        movie: {
          name: result.name,
          actor: result.actor,
          id: result._id,
          metadata: {
            method: req.method,
            host: req.hostname,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const movieId = req.params.id;
  const updatedMovie = {
    name: req.body.name,
    actor: req.body.actor,
  };

  Movie.updateOne(
    {
      _id: movieId,
    },
    {
      $set: updatedMovie,
    }
  )
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Updated Movie",
        actor: {
          acknowledged: result.acknowledged,
          modifiedCount: result.modifiedCount,
          upsertedId: result.upsertedId,
          upsertedCount: result.upsertedCount,
          matchedCount: result.matchedCount,
        },
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.deleteOne({ _id: movieId })
    .then((result) => {
      res.status(200).json({
        message: "Deleted Movie",
        movie: {
          acknowledged: result.acknowledged,
          deletedCount: result.deletedCount,
        },
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

module.exports = router;
