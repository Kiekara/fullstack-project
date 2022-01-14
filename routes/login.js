const express = require("express");
const Validator = require("jsonschema").Validator;

const login = express.Router();
const validator = new Validator();

module.exports = login;
