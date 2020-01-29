const express = require('express'); //Hace el llamado al módulo express
const bcrypt = require('bcrypt'); //Hace el llamado al módulo bcrypt
const _ = require('underscore'); //requiere underscore
const Usuario = require('../models/usuario'); //importa clase usuario
const app = express();

//Define una ruta con el método GET para consultas desde la base
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0; //variable inicializada en 0
    desde = Number(desde);

    let limite = req.query.limite || 5; //variable con limite 5
    limite = Number(limite);

    Usuario.find({}, 'nombre email role goole img') //
        .limit(limite) //método que define cuandos registros devolver
        .skip(desde) //Indique el número de registros a omitir antes de devolver los resultados de la ejecución de una instancia de consulta
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Método para contar el número de registros de la base
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios

                });
            });
        });
});

//Define una ruta con el método POST para ingresar datos a la base
app.post('/usuario', function(req, res) {

    let body = req.body; //Contiene pares de datos clave-valor enviados en el cuerpo de la solicitud.

    let usuario = new Usuario({
        nombre: body.nombre, //nombre
        email: body.email, //correo
        password: bcrypt.hashSync(body.password, 10), //contraseña encriptada
        role: body.role, //rol de usuario
        img: body.img //imagen
    });

    usuario.save((err, usuarioDB) => {
        if (err) { //si hay un error lo devuelve
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //Envía una respuesta JSON
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

//Define una ruta con el método PUT para editar datos en la base
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id //variable para el id de usuario
        //Devuelve una copia del objeto , filtrada para que solo tenga valores para las claves incluidas en un conjunto de claves válidas
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //Método para editar registros por medio del ID
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) { //si hay un error lo devuelve
            return res.status(400).json({ //Devuelve el error 400
                ok: false,
                err
            });
        }
        //Envía una respuesta JSON
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Define una ruta con el método DELETE para eliminar datos de la base
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id; //variable para el id de usuario

    //Método para eliminar registros por medio del ID
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) { //si hay un error lo devuelve
            return res.status(400).json({ //Devuelve el error 400
                ok: false,
                err
            });
        }

        //Si el usuario no se encuentra en la base devuelve un mensaje de error
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        //Envía una respuesta JSON
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

//Exporta el módulo app
module.exports = app;