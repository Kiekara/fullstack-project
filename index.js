const express = require("express");
const cors = require("cors");
const data = require("./routes/words.js");
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());

app.use("/data", data);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
