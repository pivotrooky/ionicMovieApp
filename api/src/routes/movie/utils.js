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
  const {
    title,
    year,
    imdbId,
    imdbRating,
    type,
    image,
    website,
    plot,
    actors,
    director,
    genre,
    userId,
  } = req.body;

  Movie.findOne()
  Movie.create({
    title,
    year,
    imdbId,
    imdbRating,
    type,
    image,
    website,
    plot,
    actors,
    director,
    userId,
    genre,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => res.send(err));
};

//REFACTOR!
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

module.exports = {
  getAllMovies,
  getOnlyMovie,
  createMovie,
  deleteMovie,
  modifyMovie,
  getMoviesOfUser,
};
