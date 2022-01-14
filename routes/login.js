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

module.exports = login;
