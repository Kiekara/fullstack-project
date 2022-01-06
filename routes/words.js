const express = require("express");
const db = require("../database/crudrepository.js");

const words = express.Router();

words.get("/data/:table", async (req, res) => {
  let table = req.params.table;

  try {
    let result = await db.findAll(table);
    res.send(result);
  } catch (err) {
    res.status(err).end();
  }
});

words.post("/data/:table", async (req, res) => {
  let table = req.params.table;
  let data = req.body;

  try {
    let result = await db.save(table, data);
    res.status(result).send(data);
  } catch (err) {
    res.status(err).end();
  }
});

module.exports = words;
