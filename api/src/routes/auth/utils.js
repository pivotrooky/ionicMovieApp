const passport = require('passport');

//Ruta de login
const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({id: user.id, email: user.email});
    });
  })(req, res, next);
};

//Si está loguedo, manda datos del usuario
const me = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send('Not logged');
  }
};
//Si está logueado, se desloguea
const userLogout = (req, res) => {
  req.logout();
  return res.status(200).send(null);
};



module.exports = {
  login,
  me,
  userLogout,
};
