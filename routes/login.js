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

module.exports = login;
