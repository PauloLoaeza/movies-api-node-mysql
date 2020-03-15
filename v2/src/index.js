const express = require("express");

const connection = require("./db/connection");
const movies = require("./routes/movies.routes");

const app = express();
app.use(express.json());
app.use("/api/movies", movies);

connection.connect(err => {
  if (err) {
    throw err;
  }

  console.log("Connected to db");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
