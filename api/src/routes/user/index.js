const server = require('express').Router();
const {
	getAllUsers,
	getOnlyUser,
	createUser,
	deleteUser,
	modifyUser,
} = require('./utils.js');

// ------------------- ROUTE PRODUCTOS ------------------

//Get --> Mostrar todos los users
server.get('/', getAllUsers);

// Get --> Muestra los datos de un solo user
server.get('/:id', getOnlyUser);

//Post --> Crear user
server.post('/', createUser);

//Put --> Modificar un user
server.put('/:id', modifyUser);

//Delete --> Eliminar un user
server.delete('/:id', deleteUser);

module.exports = server;
