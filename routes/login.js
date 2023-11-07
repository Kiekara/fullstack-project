// Require needed modules
const express = require("express");
const Validator = require("jsonschema").Validator;

// Create temporary users for access rights
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

// Initiate express router and json validator
const login = express.Router();
const validator = new Validator();

// Schema for validating login credentials
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
 * Function for checking if the user is authorized to enter the website
 * @param {{username: string, password: string}} credentials                                Username and password of the user
 * @returns {{status: string, code: number, response: {rights: string} | {msg: string}}}    Status, code and response
 */
const authorizeLogin = (credentials) => {
  let user = users.find((user) => user.username === credentials.username);

  // Check if the username exists
  if (user) {
    // Check if the username is affiliated with the right password
    if (user.password === credentials.password) {
      return { status: "OK", code: 200, response: { rights: user.rights } };
    } else {
      return {
        status: "unauthorized",
        code: 401,
        response: { msg: "Incorrect username or password." },
      };
    }
  } else {
    return {
      status: "unauthorized",
      code: 401,
      response: { msg: "Incorrect username or password." },
    };
  }
};

// Define http post route for login router
login.post("/", (req, res) => {
  let credentials = req.body;
  let credentialsValidation = validator.validate(
    credentials,
    credentialsSchema
  );
  // Save and destruct the result
  const { status, code, response } = authorizeLogin(credentials);

  // Check if there are any validation errors
  if (credentialsValidation.errors.length > 0) {
    res.status(401).send(credentialsValidation.errors);
    // Check if authentication was unauthorized
  } else if (status === "unauthorized") {
    res.status(code).send(response);
  } else {
    res.status(code).send(response);
  }
});

module.exports = login;
