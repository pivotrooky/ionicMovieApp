const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./Midlewares");
const {
  userLogout,
  me,
  login,
} = require("./utils.js");

//Post --> Login route
router.post("/login", login);

//Get --> Login route
router.get("/login", isAuthenticated, (req, res) => {
  return res.send(req.user);
});

//Get --> Logs user out.
router.get("/logout", userLogout);

//Get --> Gets data of logged user, if there is one
router.get("/me", me);

module.exports = router;
