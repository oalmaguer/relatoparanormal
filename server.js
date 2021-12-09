const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes/routes.js");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

require("./config/passport");

const PORT = 5000;
require("./database");

app.options("*", cors());
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

//borras user en user.route porque ya esta aqui
app.use("/user", userRouter);

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
