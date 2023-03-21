const express = require("express");
const mongoose = require("mongoose");
const messages = require("../../messages/messages");
const router = express.Router();
const Actor = require("../models/actor");
const Movie = require("../models/movie");

router.get("/", (req, res, next) => {
  Actor.find({})
    .select("name _id")
    .populate("movie", "name _id actor")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: messages.actor_not_found,
        });
      }
      res.status(200).json({
        message: messages.actors_found,
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
    .select("name _id")
    .populate("movie", "name _id actor")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: messages.actor_not_found,
        });
      }
      res.status(200).json({
        message: messages.actor_found,
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
  Actor.find({ name: req.body.name })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return res.status(406).json({
          message: messages.actor_exists,
        });
      }

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
            message: messages.actor_saved,
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
    })
    .catch();
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
    .exec()
    .then((result) => {
      res.status(200).json({
        message: messages.actor_updated,
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
    .exec()
    .then((result) => {
      res.status(200).json({
        message: messages.actor_deleted,
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
