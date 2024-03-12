const express = require("express");
const { client } = require("./database");
const seed = require("./database/seed.js");
const api = require("./api");
const port = 8080;

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use("/api", api);
app.use((err, req, res, next) => {
  res.status(500).send({ error: "Something's Wrong" });
});

const init = async () => {
  await client.connect();
  console.log("connected to db");

  await seed();

  app.listen(port, () => {
    console.log(`Listening on port ${port} and database is seeded`);
  });
};

init();
