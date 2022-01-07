const express = require("express");
const Validator = require("jsonschema").Validator;
const db = require("../database/crudrepository.js");

const words = express.Router();
const validator = new Validator();

const wordRowSchema = {
  minProperties: 2,
  maxProperties: 4,
  type: "object",
  properties: {
    tag_id: {
      type: "number",
      minimum: 1,
    },
    word_eng: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    word_swe: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    word_fin: {
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
  },
};

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

  if (table == "words") {
    let validation = validator.validate(data, wordRowSchema);

    if (validation.errors.length > 0) {
      res.status(400).send(validation.errors);
    } else {
      try {
        let result = await db.save(table, data);
        res.status(result).send(data);
      } catch (err) {
        res.status(err).end();
      }
    }
  }
});

module.exports = words;
