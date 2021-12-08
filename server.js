const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes/routes.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 5000;
require("./database");

app.options("*", cors());
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.static(path.join(__dirname, "src")));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
