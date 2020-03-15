const express = require("express");
const mysql = require("mysql");
const dbConfig = require("./config/db");

const app = express();
app.use(express.json());

const connection = mysql.createConnection(dbConfig);
connection.connect(err => {
  if (err) {
    throw err;
  }

  console.log("Connected to db");
});

app.get("/api/movies", (req, res) => {
  const query = `SELECT * FROM movies`;
  connection.query(query, (err, movies) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(movies);
  });
});

app.get("/api/movies/:id", (req, res) => {
  const query = `SELECT * FROM movies WHERE id = ${req.params.id}`;
  connection.query(query, (err, movies) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (movies.length === 0) {
      return res
        .status(404)
        .send("Could not find movie with id: " + req.params.id);
    }

    res.json(movies[0]);
  });
});

app.post("/api/movies", (req, res) => {
  const query = `INSERT INTO movies(name, director, release_date) VALUES(?, ?, ?)`;
  const { name, director, release_date } = req.body;
  const params = [name, director, release_date];

  connection.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ id: result.insertId, name, director, release_date });
  });
});

app.put("/api/movies/:id", (req, res) => {
  const query = `SELECT * FROM movies WHERE id = ${req.params.id}`;
  connection.query(query, (err, movies) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (movies.length === 0) {
      return res
        .status(404)
        .send("Could not find movie with id: " + req.params.id);
    }

    const updateQuery = `UPDATE movies SET name = ?, director = ?, release_date = ? WHERE id = ${req.params.id}`;
    const { name, director, release_date } = req.body;
    const params = [name, director, release_date];

    connection.query(updateQuery, params, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.affectedRows !== 1) {
        return res.status(400).send("Movie was not updated");
      }

      res.json({ id: movies[0].id, name, director, release_date });
    });
  });
});

app.delete("/api/movies/:id", (req, res) => {
  const query = `SELECT * FROM movies WHERE id = ${req.params.id}`;
  connection.query(query, (err, movies) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (movies.length === 0) {
      return res
        .status(404)
        .send("Could not find movie with id: " + req.params.id);
    }

    const deleteQuery = `DELETE FROM movies WHERE id = ${req.params.id}`;
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.affectedRows !== 1) {
        return res.status(400).send("Movie was not deleted");
      }

      res.json(movies[0]);
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
