const express = require("express");
const router = express.Router();
const {
  login,
  processLogin,
  register,
  processRegister,
  logout,
  userDelete,
  loginAndRegisterGoogle,
} = require("../controllers/authentication");

const passport = require("passport");

// app.js --> "/autenticacion"

//  /autenticacion/iniciar
router.get("/iniciar", login);
router.post("/iniciar", processLogin);

//  /autenticacion/registrar
router.get("/registrar", register);

router.post("/registrar", processRegister);

router.get("/cerrar-sesion", logout);

router.get("/eliminar", userDelete);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// LOGIN GOOGLE
router.get("/iniciar/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/autenticacion/iniciar" }),
  loginAndRegisterGoogle
);

module.exports = router;
