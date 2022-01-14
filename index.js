const express = require("express");
const cors = require("cors");
const data = require("./routes/data.js");
const login = require("./routes/login.js");
const app = express();
const port = 8080;

app.use(express.static("./build"));

app.use(express.json());

app.use(cors());

app.use("/login", login);

app.use("/data", data);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
