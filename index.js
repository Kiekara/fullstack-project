const express = require("express");
const cors = require("cors");
const words = require("./routes/words.js");
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());

app.use("/language-app", words);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
