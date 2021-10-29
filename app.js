'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// CARGAR ARCHIVOS RUTAS
const project_routes = require('./routes/project');

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// RUTAS
app.use('/api', project_routes);

// app.get('/', (req, res) => {
//     res.status(200).send(
//         '<h1>Home Page</h1>'    
//     );
// });
// app.post('/test/:id', (req, res) => {
//     console.log(req.query.nombre);
//     console.log(req.body.apellido);
//     console.log(req.params.id);
//     res.status(200).send({
//         message: "Hola mundo desde mi api de Nodejs"
//     });
// });

// exportar
module.exports = app;

