const server = require('express').Router();
const {
	getAllUsers,
	getOnlyUser,
	createUser,
	deleteUser,
	modifyUser,
} = require('./utils.js');

// ------------------- ROUTE USUARIOS ------------------

//Get --> Gets all users
server.get('/', getAllUsers);

// Get --> Gets data of a given user
server.get('/:id', getOnlyUser);

//Post --> Creates a user
server.post('/', createUser);

//Put --> Modifies a user
server.put('/:id', modifyUser);

//Delete --> Deletes a user
server.delete('/:id', deleteUser);

module.exports = server;
