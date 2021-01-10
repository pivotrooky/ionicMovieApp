const passport = require('passport');

//Login route
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

//If user is logged, sends data
const me = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send('Not logged');
  }
};
//If user is logged, user will not be logged out
const userLogout = (req, res) => {
  req.logout();
  return res.status(200).send(null);
};



module.exports = {
  login,
  me,
  userLogout,
};
