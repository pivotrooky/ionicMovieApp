const { Movie, User } = require("../../db.js");

// Get all movies
const getAllMovies = (req, res) => {
  Movie.findAll()
    .then((movies) => res.status(200).send(movies))
    .catch((err) => res.send(err));
};
// Gets data of a single movie
const getOnlyMovie = (req, res) => {
  let { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => res.send(err));
};

// Creates a new movie
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
    "userRating",
  ];

  const newMovie = {};
  movieKeys.forEach((key) => {
    let value = req.body[key];
    if (value === null || value === undefined) value = null;
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
            .status(409)
            .send("You'd already added that to your list!");
        }
        Movie.create(newMovie).then((movie) => res.status(200).send(movie));
      });
  } else {
    Movie.create(newMovie).then((movie) => res.status(200).send(movie));
    //refactor needed
  }
};

//Modifies movie

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
    "userRating",
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

//Deletes a movie

const deleteMovie = (req, res) => {
  const { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => movie.destroy())
    .then(() => res.status(200).send("Movie deleted correctly"))
    .catch((err) => res.send(err));
};

//Gets us all movies of a given user
const getMoviesOfUser = (req, res) => {
  const { id } = req.params;
  User.findAll({
    where: {
      id,
    },
    include: [{ model: Movie }],
    //we include user movies
  })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => res.send(err));
};
//for now sending the whole user object is fine, later it'd probably be best to just send the movies.

//Gets the ID of a movie in a *local* context, given that movie's imdbID as input.
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
