// Require needed modules
const express = require("express");
const cors = require("cors");
const data = require("./routes/data.js");
const login = require("./routes/login.js");

// Initiate express intance
const app = express();
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
