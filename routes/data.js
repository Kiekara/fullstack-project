// Require needed modules
const express = require("express");
const Validator = require("jsonschema").Validator;
const db = require("../database/crudrepository.js");

// Initiate express router and json validator
const data = express.Router();
const validator = new Validator();

// Schema for validating words
const wordRowSchema = {
  minProperties: 2,
  maxProperties: 3,
  type: "object",
  properties: {
    tagID: {
      type: "number",
      minimum: 1,
    },
    wordEng: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    wordFin: {
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
  },
  required: ["wordEng", "wordFin"],
};

// Schema for validating tags
const tagSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["name"],
};

// Schema for table validation
const tableSchema = {
  enum: ["words", "tags"],
};

// Define http get route for data router
data.get("/:table", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  // Check if there are any validation errors
  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else {
    // Get everything from the requested table
    try {
      let result = await db.findAll(table);
      res.send(result);
    } catch (err) {
      res.status(err).end();
    }
  }
});

// Define http post route for data router
data.post("/:table", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  let data = req.body;
  let validation = {};

  // Check if table is "words" or "tags"
  if (table == "words") {
    validation = validator.validate(data, wordRowSchema);
  } else if (table == "tags") {
    validation = validator.validate(data, tagSchema);
  }

  // Check if there are any errors in either validation
  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else if (validation.errors.length > 0) {
    res.status(400).send(validation.errors);
  } else {
    // Save the given data to the requested table
    try {
      let result = await db.save(table, data);
      res.status(result).send(data);
    } catch (err) {
      res.status(err).end();
    }
  }
});

// Define http put route for data router
data.put("/:table/:id([0-9]+)", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  let data = req.body;
  let validation = {};

  let id = req.params.id;
  let idFound = false;

  // Check if table is "words" or "tags"
  if (table == "words") {
    validation = validator.validate(data, wordRowSchema);
  } else if (table == "tags") {
    validation = validator.validate(data, tagSchema);
  }

  // Check if there are any errors in either validation
  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else if (validation.errors.length > 0) {
    res.status(400).send(validation.errors);
  } else {
    // Search for the requested id
    try {
      let result = await db.findById(table, id);
      idFound = result;
    } catch (err) {
      res.status(err).send({ msg: `could not find resource with id = ${id}` });
    }

    // If the id was found make changes to the table with that id
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

// Define http delete route for data router
data.delete("/:table/:id([0-9]+)", async (req, res) => {
  let table = req.params.table;
  let tableValidation = validator.validate(table, tableSchema);

  let id = req.params.id;
  let idFound = false;

  // Check if there are any validation errors
  if (tableValidation.errors.length > 0) {
    res.status(403).send(tableValidation.errors);
  } else {
    try {
      // Search for the requested id
      let result = await db.findById(table, id);
      idFound = result;
    } catch (err) {
      res
        .status(err)
        .send({ msg: `could not delete properties where id = ${id}` });
    }

    // if the id was found delete data with that id from the table
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

module.exports = data;
