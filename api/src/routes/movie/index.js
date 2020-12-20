const server = require('express').Router();
const {
	getAllMovies,
	getOnlyMovie,
	createMovie,
	deleteMovie,
	modifyMovie,
	addMovieToUser,
	removeMovieFromUser,
	getMoviesOfUser,
} = require('./utils.js');

// ------------------- ROUTE PRODUCTOS ------------------

//Get --> Mostrar todas las películas
server.get('/', getAllMovies);

// Get --> Muestra los datos de una sola película
server.get('/:id', getOnlyMovie);

//Post --> Crea una nueva película
server.post('/', createMovie);

//Put --> Modificar una película
server.put('/:id', modifyMovie);

//Delete --> Eliminar una película
server.delete('/:id', deleteMovie);

//Get --> Mostrar las películas de un usuario específico
server.get('/of/:id', getMoviesOfUser);

//Post --> Vincular película con usuario
server.post('/:movieId/bind/:userId', addMovieToUser);

//Delete --> Desvincular película de usuario
server.delete('/:movieId/bind/:userId', removeMovieFromUser);



module.exports = server;