/**
 * Data router module
 * @module data
 */

/**
 * Express module
 * @type {NodeModule}
 */
const express = require("express");
/**
 * Jsonschema module
 * @type {NodeModule}
 */
const Validator = require("jsonschema").Validator;
/**
 * Database connection functions
 * @type {module}
 */
const db = require("../database/crudrepository.js");

/**
 * Data router
 * @express router
 */
const data = express.Router();
/**
 * Schema validator
 * @instance Validator()
 * @type {{}}
 */
const validator = new Validator();

/**
 * Word row schema
 * @type {{minProperties: number, maxProperties: number, type: string, properties: {tagID: {type: string, minimum: number}, wordEng: {type: string, minLength: number, maxLength: number}, wordFin: {type: string, minLength: number, maxLength: number},}, required: Array<string>}}
 */
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

/**
 * Tag schema
 * @type {{type: string, properties: {name: {type: string, minLength: number},}, required: Array<string>}}
 */
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

/**
 * Table schema
 * @type {{enum: Array<string>}}
 */
const tableSchema = {
  enum: ["words", "tags"],
};

// Define http get route for data router
data.get("/:table", async (req, res) => {
  /**
   * Extracted table parameter
   * @type {string}
   */
  let table = req.params.table;
  // Save validation information
  let tableValidation = validator.validate(table, tableSchema);

  // Check if there are any validation errors
  if (tableValidation.errors.length > 0) {
    // Response with status code 403 and send errors
    res.status(403).send(tableValidation.errors);
  } else {
    try {
      /**
       * Database result
       * @type {Promise}
       */
      let result = await db.findAll(table);
      // Respond with result
      res.send(result);
    } catch (err) {
      // Respond with status code 404 and end
      res.status(err).end();
    }
  }
});

// Define http post route for data router
data.post("/:table", async (req, res) => {
  /**
   * Extracted table parameter
   * @type {string}
   */
  let table = req.params.table;
  // Save validation information
  let tableValidation = validator.validate(table, tableSchema);

  /**
   * Extracted post data
   * @type {{tagID: number, wordEng: string, wordFin: string}}
   */
  let data = req.body;
  // Define empty validation object
  let validation = {};

  // Check if table is "words"
  if (table == "words") {
    // Save validation information
    validation = validator.validate(data, wordRowSchema);
    // Check if table is "tags"
  } else if (table == "tags") {
    // Save validation information
    validation = validator.validate(data, tagSchema);
  }

  // Check if there are any validation errors
  if (tableValidation.errors.length > 0) {
    // Respond with status code 403 and send errors
    res.status(403).send(tableValidation.errors);
    // Check if there are any validation errors
  } else if (validation.errors.length > 0) {
    // Respond with status code 400 and send errors
    res.status(400).send(validation.errors);
  } else {
    try {
      /**
       * Database result
       * @type {Promise}
       */
      let result = await db.save(table, data);
      // Respond with result and send data
      res.status(result).send(data);
    } catch (err) {
      // Respond with status code 500 and end
      res.status(err).end();
    }
  }
});

// Define http put route for data router
data.put("/:table/:id([0-9]+)", async (req, res) => {
  /**
   * Extracted table parameter
   * @type {string}
   */
  let table = req.params.table;
  // Save validation information
  let tableValidation = validator.validate(table, tableSchema);

  /**
   * Extracted post data
   * @type {{tagID: number, wordEng: string, wordFin: string}}
   */
  let data = req.body;
  // Define empty validation object
  let validation = {};

  /**
   * Extracted id parameter
   * @type {number}
   */
  let id = req.params.id;
  // Define false state for finding id
  let idFound = false;

  // Check if table is "words"
  if (table == "words") {
    // Save validation information
    validation = validator.validate(data, wordRowSchema);
    // Check if table is "tags"
  } else if (table == "tags") {
    // Save validation information
    validation = validator.validate(data, tagSchema);
  }

  // Check if there are any validation errors
  if (tableValidation.errors.length > 0) {
    // Respond with status code 403 and send errors
    res.status(403).send(tableValidation.errors);
    // Check if there are any validation errors
  } else if (validation.errors.length > 0) {
    // Response with status code 400 and send errors
    res.status(400).send(validation.errors);
  } else {
    try {
      /**
       * Database result
       * @type {Promise}
       */
      let result = await db.findById(table, id);
      // Save found id
      idFound = result;
    } catch (err) {
      // Respond with status code 404 and send error message
      res.status(err).send({ msg: `could not find resource with id = ${id}` });
    }

    // Check if id was found
    if (idFound) {
      try {
        /**
         * Database result
         * @type {Promise}
         */
        let result = await db.editById(table, data, id);
        // Respond with result and send data
        res.status(result).send(data);
      } catch (err) {
        // Respond with status code 500 and end
        res.status(err).end();
      }
    }
  }
});

// Define http delete route for data router
data.delete("/:table/:id([0-9]+)", async (req, res) => {
  /**
   * Extracted table parameter
   * @type {string}
   */
  let table = req.params.table;
  // Save validation information
  let tableValidation = validator.validate(table, tableSchema);

  /**
   * Extracted id parameter
   * @type {number}
   */
  let id = req.params.id;
  // Define false state for finding id
  let idFound = false;

  // Check if there are any validation errors
  if (tableValidation.errors.length > 0) {
    // Respond with status code 403 and send errors
    res.status(403).send(tableValidation.errors);
  } else {
    try {
      /**
       * Database result
       * @type {Promise}
       */
      let result = await db.findById(table, id);
      // Save found id
      idFound = result;
    } catch (err) {
      // Response with status code 404 and send error message
      res
        .status(err)
        .send({ msg: `could not delete properties where id = ${id}` });
    }

    // Check if id was found
    if (idFound) {
      try {
        /**
         * Database result
         * @type {Promise}
         */
        let result = await db.deleteById(table, id);
        // Respond with result and end
        res.status(result).end();
      } catch (err) {
        // Respond with status code 500 and end
        res.status(err).end();
      }
    }
  }
});

/**
 * Export data router module
 * @exports data
 */
module.exports = data;
