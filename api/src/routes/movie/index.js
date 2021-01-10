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

//Get --> Gets all movies
server.get('/', getAllMovies);

// Get --> Gets local ID of a movie, if there is one
server.post('/local/', getLocalID);

// Get --> Gets data of a single movie
server.get('/:id', getOnlyMovie);

//Post --> Creates a new movie
server.post('/', createMovie);

//Put --> Updates data of an existing movie
server.put('/:id', modifyMovie);

//Delete --> Deletes a movie
server.delete('/:id', deleteMovie);

//Get --> Gets all movies of a specific user
server.get('/of/:id', getMoviesOfUser);


module.exports = server;
