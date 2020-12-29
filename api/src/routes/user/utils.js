const { User } = require("../../db.js");
const { Op } = require("sequelize");

// Muestra un JSON con todos los usuarios registrados (no se está usando, serviría si más adelante tuviéramos admins en la app)
const getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.send(err));
};
// Muestra los datos de un solo user
const getOnlyUser = (req, res) => {
  let { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.send(err));
};

// Crea un nuevo user y lo guarda en la base de datos
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

//Modifica datos de un usuario (por ahora el front no está usando estas últimas rutas)
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

//Elimina el usuario
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
