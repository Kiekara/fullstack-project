const express = require("express");
const Validator = require("jsonschema").Validator;

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

const login = express.Router();
const validator = new Validator();

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

const authorizeLogin = (credentials) => {
  let user = users.find((user) => user.username === credentials.username);

  if (user) {
    if (user.password === credentials.password) {
      return { status: "OK", code: 200, response: { rights: user.rights } };
    } else {
      return {
        status: "unauthorized",
        code: 401,
        response: { msg: "Incorrect password." },
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

login.post("/", (req, res) => {
  let credentials = req.body;
  let credentialsValidation = validator.validate(
    credentials,
    credentialsSchema
  );
  const { status, code, response } = authorizeLogin(credentials);

  if (credentialsValidation.errors.length > 0) {
    res.status(401).send(credentialsValidation.errors);
  } else if (status === "unauthorized") {
    res.status(code).send(response);
  } else {
    res.status(code).send(response);
  }
});

module.exports = login;
