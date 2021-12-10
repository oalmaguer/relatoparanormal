const usersCtrl = {};
const User = require("../src/models/User");
const ObjectId = require("mongodb").ObjectId;
const passport = require("passport");

usersCtrl.signup = async (req, res) => {
  const { user, password, confirmPassword, email } = req.body;
  if (password !== confirmPassword) {
    res.send("ERROOOR");
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      res.send("Email already in use");
    } else {
      const newUser = new User({ user, password, email });
      newUser.password = await newUser.encryptPassword(password);
      const userCreated = await newUser.save();
      res.send(userCreated);
    }
  }
};

usersCtrl.getUser = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const userFound = await User.find({ _id: id });
  res.send(userFound);
};

usersCtrl.login = passport.authenticate("local", {
  failureRedirect: "/user/fail",
  successRedirect: "/user/success",
});

usersCtrl.logout = (req, res) => {
  req.logout();
  res.redirect("/user/success");
};

module.exports = usersCtrl;
