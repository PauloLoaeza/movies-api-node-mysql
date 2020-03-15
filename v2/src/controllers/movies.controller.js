const db = require("../db/connection");

exports.findAll = function() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM movies`;
    db.query(query, (error, movies) => {
      if (error) {
        reject(error);
      }

      resolve(movies);
    });
  });
};

exports.findById = function(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM movies WHERE id = ${id}`;
    db.query(query, (error, movies) => {
      if (error) {
        reject(error);
      }

      if (movies.length === 0) {
        resolve(null);
      }

      resolve(movies[0]);
    });
  });
};

exports.add = function(movie) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO movies(name, director, release_date) VALUES(?, ?, ?)`;

    const { name, director, release_date } = movie;
    const params = [name, director, release_date];

    db.query(query, params, (error, result) => {
      if (error) {
        reject(error);
      }

      if (result.affectedRows !== 1) {
        resolve(null);
      }

      resolve({ id: result.insertId, name, director, release_date });
    });
  });
};

exports.update = function(movie) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE movies SET name = ?, director = ?, release_date = ? WHERE id = ${movie.id}`;
    const { name, director, release_date } = movie;
    const params = [name, director, release_date];

    db.query(query, params, (error, result) => {
      if (error) {
        reject(error);
      }

      if (result.affectedRows !== 1) {
        resolve(null);
      }

      resolve(movie);
    });
  });
};

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM movies WHERE id = ${id}`;

    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      if (result.affectedRows !== 1) {
        resolve(false);
      }

      resolve(true);
    });
  });
};
