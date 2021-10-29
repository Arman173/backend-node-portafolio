'use strict'
require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT;

/***  CONECTAMOS LA APLICACION DE NODE CON NUESTRA BASE DE DATOS DE MONGODB  ***/

mongoose.Promise = global.Promise;
// en la url de mongodb, el puerto del localhost por defecto de mongo es el "27017"
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then( () => {
        console.log("Conexion a la base de datos establecida con exito!");

        // Creacion del servidor
        app.listen( port, () => {
            console.log(`Servidor corriendo correctamente en http://localhost:${ port }`);
        });

    })
    .catch( err => console.log( err ) );

/***  ---------------------------------------------------------------------  ***/

