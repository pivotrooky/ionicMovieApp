const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./Midlewares");
const {
  userLogout,
  me,
  login,
} = require("./utils.js");

//Post --> Ruta de login
router.post("/login", login);

//Get --> Ruta de login.
router.get("/login", isAuthenticated, (req, res) => {
  return res.send(req.user);
});

//Get --> Se desloguea si estaba logueado
router.get("/logout", userLogout);

//Get --> Trae los datos del usuario logueado en este momento, si hay uno logueado.
router.get("/me", me);

module.exports = router;
