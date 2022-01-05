const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
