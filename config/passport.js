const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../src/models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      console.log("=============");

      //Si existe correo de usuario
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "No se encontro usuario" });
      } else {
        //validar contraseña
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);
//recibe funcion con usuario y done
//guarda user en sesion
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

//hace consuilta para saber si tiene autorizacion
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
