const server = require('express').Router();
const {
	getAllUsers,
	getOnlyUser,
	createUser,
	deleteUser,
	modifyUser,
} = require('./utils.js');

// ------------------- ROUTE USUARIOS ------------------

//Get --> Muestra todos los usuarios
server.get('/', getAllUsers);

// Get --> Muestra los datos de un solo usuario
server.get('/:id', getOnlyUser);

//Post --> Crea un usuario
server.post('/', createUser);

//Put --> Modifica un usuario
server.put('/:id', modifyUser);

//Delete --> Elimina un usuario
server.delete('/:id', deleteUser);

module.exports = server;
