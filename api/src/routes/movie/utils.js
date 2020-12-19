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
  const { title, year, imdbId, type, image } = req.body;
  Movie.create({
    title,
    year,
    imdbId,
    type,
    image,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => res.send(err));
};

//REFACTOR!
const modifyMovie = (req, res) => {
  const { title, year, imdbId, type, image } = req.body;
  const { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => {
      if (title) {
        movie.title = title;
        movie.save();
      }
      if (year) {
        movie.year = year;
        movie.save();
      }
      if (imdbId) {
        movie.imdbId = imdbId;
        movie.save();
      }
      if (type) {
        movie.type = type;
        movie.save();
      }
      if (image) {
        movie.image = image;
        movie.save();
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


//Post --> Crear asociación entre una película y un usuario
const addMovieToUser = (req, res) => {
  const {movieId, userId} = req.params;

  let movieObj;

  Movie.findOne({ where: { id: movieId } })
    .then((movie) => {
      movieObj = movie;
      console.log(movie, "película encontrada");
      return movie.hasUser(userId);
    })
    .then((res) => {
      //da falso siempre, corregir
      if (res) return res.status(200).json(movieObj);
      movieObj.addUser(userId).then(res.status(201).json(movieObj));
    })
    .catch((err) => res.send(err));

}


//Delete --> Borrar asociación entre una película y un usuario
const removeMovieFromUser = (req, res) => {
  const {movieId, userId} = req.params;

  Movie.findOne({ where: { id: movieId } })
    .then((movie) => {
      movie.removeUser(userId).then(res.status(200).json(movie));
    })
    .catch((err) => res.send(err));
  
}

//Get -> nos trae las películas de un usuario en especial
const getMoviesOfUser = (req, res) => {
  const { id } = req.params;
  console.log(id, "SOY USER ID")
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
  addMovieToUser,
  removeMovieFromUser,
  getMoviesOfUser
};
