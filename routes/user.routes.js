const express = require("express");
const router = express.Router();
const {
  signup,
  getUser,
  login,
  logout,
} = require("../controllers/user.controller");
const passport = require("passport");

router.post("/signup", signup);

router.get("/get/:id", getUser);

router.post("/login", login);

router.get("/logout", logout);

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

router.get("/auth", (req, res) => {
  res.send(req.isAuthenticated() ? req.user : "0");
});

module.exports = router;
