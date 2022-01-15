/**
 * Login router module
 * @module login
 */

/**
 * Express module
 * @type {NodeModule}
 */
const express = require("express");
/**
 * Jsonschema validator
 *@type {NodeModule}
 */
const Validator = require("jsonschema").Validator;

/**
 * Dummy users array
 * @type {Array<object>}
 */
const users = [
  {
    username: "teacher",
    password: "1234",
    rights: "admin",
  },
  {
    username: "student",
    password: "0000",
    rights: "user",
  },
];

/**
 * Login router
 * @express router
 */
const login = express.Router();
/**
 * Schema validator
 * @instance Validator()
 * @type {{}}
 */
const validator = new Validator();

/**
 * Credentials schema
 * @type {{type: string, properties: {username: {type: string}, password: {type: string},}, required: Array<string>}}
 */
const credentialsSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["username", "password"],
};

/**
 * Checks if the user is authorized to enter the website
 * @param {{username: string, password: string}} credentials                                Username and password of the user
 * @returns {{status: string, code: number, response: {rights: string} | {msg: string}}}    Status, code and response
 */
const authorizeLogin = (credentials) => {
  /**
   * Checks if the username even exists
   * @type {{username: string, password: string, rights: string}}
   */
  let user = users.find((user) => user.username === credentials.username);

  // Check if the username exists
  if (user) {
    // Check if the username is affiliated with the right password
    if (user.password === credentials.password) {
      // Return OK status, code 200 and assigned user rights
      return { status: "OK", code: 200, response: { rights: user.rights } };
    } else {
      // Return unauthorized status, code 401 and error message
      return {
        status: "unauthorized",
        code: 401,
        response: { msg: "Incorrect username or password." },
      };
    }
  } else {
    // Return unauthorized status, code 401 and error message
    return {
      status: "unauthorized",
      code: 401,
      response: { msg: "Incorrect username or password." },
    };
  }
};

// Define http post route for login router
login.post("/", (req, res) => {
  /**
   * Extracted post data
   * @type {{username: string, password: string}}
   */
  let credentials = req.body;
  // Save validation information
  let credentialsValidation = validator.validate(
    credentials,
    credentialsSchema
  );
  // Save and destruct the result
  const { status, code, response } = authorizeLogin(credentials);

  // Check if there are any validation errors
  if (credentialsValidation.errors.length > 0) {
    // REspond with status code 401 and send errors
    res.status(401).send(credentialsValidation.errors);
    // Check if authentication was unauthorized
  } else if (status === "unauthorized") {
    // Respond with status code 401 and send error message
    res.status(code).send(response);
  } else {
    // Respond with status code 200 and send user rights
    res.status(code).send(response);
  }
});

/**
 * Export login router module
 * @exports login
 */
module.exports = login;
