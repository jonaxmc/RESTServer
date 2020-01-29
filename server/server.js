//Hace un llamado a las librerias
const express = require('express'); //Hace el llamado al módulo express
const app = express(); //Llama a la función express y coloca una nueva aplicación Express dentro de la variable app (para iniciar una nueva aplicación Express)
const bodyParser = require('body-parser'); //Hace el llamado al módulo body-parser
require('./config/config')



const mongoose = require('mongoose'); //Hace el llamado al módulo mongoose

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario'));

//Método para conectarse a MongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE!');
    });

//Escucha las conexiones al puerto dado 
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});