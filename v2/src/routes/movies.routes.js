const express = require("express");
const router = express.Router();

const controller = require("../controllers/movies.controller");

router.get("/", async (req, res) => {
  try {
    const movies = await controller.findAll();
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await controller.findById(req.params.id);
    if (movie === null) {
      return res
        .status(404)
        .send("Could not find movie with id: " + req.params.id);
    }

    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = {
      name: req.body.name,
      director: req.body.director,
      release_date: req.body.release_date
    };

    const added = await controller.add(movie);
    if (added === null) {
      return res.status(400).send("Movie was not created");
    }

    res.status(201).json(added);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const found = await controller.findById(req.params.id);
    if (found === null) {
      return res
        .status(404)
        .send("Could not find movie with id: " + req.params.id);
    }

    const newMovie = {
      id: req.params.id,
      name: req.body.name,
      director: req.body.director,
      release_date: req.body.release_date
    };

    const updated = await controller.update(newMovie);
    if (updated === null) {
      return res.status(400).send("Movie was not updated");
    }

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const success = await controller.delete(req.params.id);
    if (!success) {
      return res.status(400).send("Movie was not deleted");
    }

    res.send("Movie deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
