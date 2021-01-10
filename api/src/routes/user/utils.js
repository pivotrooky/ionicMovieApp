const { User } = require("../../db.js");

//Gets all users (not yet used, makes sense to use only if there's an admin)
const getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.send(err));
};
//Gets data of a user
const getOnlyUser = (req, res) => {
  let { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.send(err));
};

//Creates a new user
const createUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (user) return res.status(409).send("User already exists!");
    User.create({
      email,
      password,
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.send(err));
  });
};

//Modifies user data (not yet used by app)
const modifyUser = (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (email) {
        user.email = email;
        user.save();
      }

      return user.save();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.send(err));
};

//Deletes a user
const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => user.destroy())
    .then(() => res.status(200).send("User deleted correctly"))
    .catch((err) => res.send(err));
};

module.exports = {
  getAllUsers,
  getOnlyUser,
  createUser,
  deleteUser,
  modifyUser,
};
