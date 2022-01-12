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

const tagSchema = {
  type: "object",
  properties: {
    tag: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["tag"],
};

const tableSchema = {
  enum: ["words", "tags"],
};

words.get("/:table", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else {
    try {
      let result = await db.findAll(table);
      res.send(result);
    } catch (err) {
      res.status(err).end();
    }
  }
});

words.post("/:table", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  let data = req.body;
  let validation = {};

  if (table == "words") {
    validation = validator.validate(data, wordRowSchema);
  } else if (table == "tags") {
    validation = validator.validate(data, tagSchema);
  }

  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else if (validation.errors.length > 0) {
    res.status(400).send(validation.errors);
  } else {
    try {
      let result = await db.save(table, data);
      res.status(result).send(data);
    } catch (err) {
      res.status(err).end();
    }
  }
});

words.put("/:table/:id([0-9]+)", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  let data = req.body;
  let validation = {};

  let id = req.params.id;
  let idFound = false;

  if (table == "words") {
    validation = validator.validate(data, wordRowSchema);
  } else if (table == "tags") {
    validation = validator.validate(data, tagSchema);
  }

  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else if (validation.errors.length > 0) {
    res.status(400).send(validation.errors);
  } else {
    try {
      let result = await db.findById(table, id);
      idFound = result;
    } catch (err) {
      res.status(err).send({ msg: `could not find resource with id = ${id}` });
    }

    if (idFound) {
      try {
        let result = await db.editById(table, data, id);
        res.status(result).send(data);
      } catch (err) {
        res.status(err).end();
      }
    }
  }
});

words.delete("/:table/:id([0-9]+)", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  let id = req.params.id;
  let idFound = false;

  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else {
    try {
      let result = await db.findById(table, id);
      idFound = result;
    } catch (err) {
      res
        .status(err)
        .send({ msg: `could not delete properties where id = ${id}` });
    }

    if (idFound) {
      try {
        let result = await db.deleteById(table, id);
        res.status(result).end();
      } catch (err) {
        res.status(err).end();
      }
    }
  }
});

module.exports = words;
