/**
 * Express module
 * @module express
 */
const express = require("express");
/**
 * Cors module
 * @type {NodeModule}
 */
const cors = require("cors");
/**
 * Data router
 * @type {module}
 */
const data = require("./routes/data.js");
/**
 * Login router
 * @type {module}
 */
const login = require("./routes/login.js");
/**
 * App
 * @express application
 */
const app = express();
/**
 * Server port
 * @type {string | number}
 */
const port = process.env.PORT || 8080;

// Serve static files from given subdirectory
app.use(express.static("./build"));

// Make sure content-type is json
app.use(express.json());

// Use cors middleware in case of different ports
app.use(cors());

// Define entry point for login router
app.use("/login", login);

// Define entry point for data router
app.use("/data", data);

// Start server on selected port
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
