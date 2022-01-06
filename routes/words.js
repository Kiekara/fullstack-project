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

module.exports = words;
