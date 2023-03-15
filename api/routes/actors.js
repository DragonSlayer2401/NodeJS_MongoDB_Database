const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Actor = require("../models/actor");

router.get("/", (req, res, next) => {
  Actor.find({})
    .then((result) => {
      res.status(200).json({
        message: "Retrieved Actors",
        actors: result,
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
  const actorId = req.params.id;
  Actor.findById(actorId)
    .then((result) => {
      res.status(200).json({
        message: `Retrieved Actor`,
        actor: result,
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
  const newActor = new Actor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    movie: req.body.movie,
  });

  newActor
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Actor Saved",
        actor: {
          name: result.name,
          movie: result.movie,
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
  const actorId = req.params.id;
  const updatedActor = {
    name: req.body.name,
    movie: req.body.movie,
  };

  Actor.updateOne(
    {
      _id: actorId,
    },
    {
      $set: updatedActor,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Updated Actor",
        actor: {
          name: result.name,
          movie: result.movie,
          id: result._id,
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
  const actorId = req.params.id;
  Actor.deleteOne({ _id: actorId })
    .then((result) => {
      res.status(200).json({
        message: "Deleted Actor",
        actor: {
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
