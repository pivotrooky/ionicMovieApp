Ionic Movies App
==========

Resumen del proyecto
------------
La idea general del proyecto es poder guardar la información de nuestras películas y series favoritas y darles el rating que se merecen.
Podemos agregar películas manualmente o buscarlas en OMDB, editar y restaurar la información, y borrar películas de nuestra lista.

Instrucciones
==========
Node y sus paquetes para que corra la aplicación
------------

* Descargar e instalar [Node.js](https://nodejs.org/es/download/) para tu sistema operativo.
* Instalar Ionic CLI con el siguiente comando: 
```
npm install -g @ionic/cli
```

* Clonar este repositorio.
* Desde la carpeta *api* instalar los paquetes correspondientes con el comando
```
npm install
```
* En el caso de *client*, haremos lo mismo con un comando similar:
```
npm install --legacy-peer-deps
```

* Desde la carpeta client, iniciar la aplicación con el comando
```
ionic serve
```
Llave de API de OMDB para poder buscar películas
------------
* Crear una API key de OMDB desde [este link](http://omdbapi.com/apikey.aspx)
* Guardarla en la constante API_KEY del archivo `client/src/app/environments/environment.ts`:

```
export const API_KEY = ""; //acá va tu clave!
```
PostgreSQL para nuestra base de datos local!
------------
* Descargar e instalar [PostgreSQL](https://www.postgresql.org/) para tu sistema operativo 
* Crear una base de datos con el nombre que prefieras.
* Configurar los datos de usuario, contraseña, servidor, puerto y nombre de base de datos en el archivo `api/.env`
```
DATABASE_URL = postgres://POSTGRES_USER:PASSWORD@SERVER:PORT/DB_NAME //acá van los datos de PostgreSQL!
PORT=3001
FRONT_URL= http://localhost:8100 //este puerto es el que nos da por default Ionic serve, también es configurable :)
PASSPORT_KEY="passSecret"
```

* De llegar a toparte con problemas en la configuración de PostgreSQL, estos links podrían resultar de ayuda:

https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools

https://databaseandtech.wordpress.com/2019/10/24/como-crear-un-usuario-y-asignarle-permisos-en-postgresql/

Imágenes ilustrativas de la app funcionando
------------
<img src="doc/pic1.png" alt="emulated-android" width="200"/>
<img src="doc/pic2.png" alt="emulated-android" width="200"/>
<img src="doc/pic7.png" alt="emulated-android" width="200"/>
