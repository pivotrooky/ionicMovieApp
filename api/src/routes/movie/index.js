const server = require('express').Router();
const {
	getAllMovies,
	getOnlyMovie,
	createMovie,
	deleteMovie,
	modifyMovie,
	getMoviesOfUser,
	getLocalID,
} = require('./utils.js');

// ------------------- ROUTE PRODUCTOS ------------------

//Get --> Muestra todas las películas
server.get('/', getAllMovies);

// Get --> Devuelve el id local de una película, si existe
server.post('/local/', getLocalID);

// Get --> Muestra los datos de una sola película
server.get('/:id', getOnlyMovie);

//Post --> Crea una nueva película
server.post('/', createMovie);

//Put --> Modifica una película
server.put('/:id', modifyMovie);

//Delete --> Elimina una película
server.delete('/:id', deleteMovie);

//Get --> Muestra las películas de un usuario específico
server.get('/of/:id', getMoviesOfUser);


module.exports = server;
