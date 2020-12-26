const { Movie, User } = require("../../db.js");
const { Op } = require("sequelize");

// Muestra un JSON con todas las movies guardadas
const getAllMovies = (req, res) => {
  Movie.findAll()
    .then((movies) => res.status(200).send(movies))
    .catch((err) => res.send(err));
};
// Muestra los datos de una sola movie
const getOnlyMovie = (req, res) => {
  let { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => res.send(err));
};

// Crea una nueva movie y la guarda en la base de datos
const createMovie = (req, res) => {
  const movieKeys = [
    "title",
    "year",
    "imdbID",
    "imdbRating",
    "type",
    "image",
    "website",
    "plot",
    "actors",
    "director",
    "genre",
    "userId",
  ];

  const newMovie = {};
  movieKeys.forEach((key) => {
    let value = req.body[key];
    if (!value) value = null;
    newMovie[key] = value;
  });

  let createdMovie = null;

  const { imdbID, userId } = newMovie;

  if (imdbID) {
    Movie.findOne({ where: { imdbID, userId } })
      .then((foundMovie) => {
        createdMovie = foundMovie;
      })
      .then(() => {
        if (createdMovie) {
          return res
            .status(200)
            .send("ya hay una peli creada con ese imdbID para ese usuario");
        }
        Movie.create(newMovie).then((movie) => res.status(200).send(movie));
      });
  } else {
    Movie.create(newMovie).then((movie) => res.status(200).send(movie));
    //refactor needed
  }
};

const modifyMovie = (req, res) => {
  const newKeys = [
    "title",
    "year",
    "type",
    "image",
    "actors",
    "director",
    "website",
    "plot",
    "genre",
  ];
  const newObj = {};
  newKeys.forEach((key) => {
    let newValue = req.body[key];
    if (!newValue) return;
    newObj[key] = newValue;
  });
  const { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => {
      for (key in newObj) {
        movie[key] = newObj[key];
      }
      return movie.save();
    })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => res.send(err));
};

//Elimina la movie

const deleteMovie = (req, res) => {
  const { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => movie.destroy())
    .then(() => res.status(200).send("Movie deleted correctly"))
    .catch((err) => res.send(err));
};

//Get -> nos trae las películas de un usuario en especial
const getMoviesOfUser = (req, res) => {
  const { id } = req.params;
  console.log(id, "SOY USER ID");
  User.findAll({
    where: {
      id,
    },
    //filtramos
    include: [{ model: Movie }],
    //incluimos datos de las películas
  })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => res.send(err));
};

const getLocalID = (req, res) => {
  const { imdbID, userId } = req.body;

  Movie.findOne({ where: { imdbID, userId } })
    .then((movie) => res.status(200).send({ localID: movie.id }))
    .catch((err) => res.send(err));
};

module.exports = {
  getAllMovies,
  getOnlyMovie,
  createMovie,
  deleteMovie,
  modifyMovie,
  getMoviesOfUser,
  getLocalID,
};
