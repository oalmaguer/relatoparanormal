const express = require("express");
const router = express.Router();
const { signup, getUser, login } = require("../controllers/user.controller");

router.post("/signup", signup);

router.get("/get/:id", getUser);

router.post("/login", login);

router.get("/fail", (req, res) => {
  const fail = [
    {
      status: "error",
    },
  ];
  res.send(fail);
});

router.get("/success", (req, res) => {
  const success = [
    {
      status: "success",
    },
  ];
  res.send(success);
});

module.exports = router;
