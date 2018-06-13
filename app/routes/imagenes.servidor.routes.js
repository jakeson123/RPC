'use strict';

var imagenes = require('../../app/controladores/imagenes.servidor.controladores'),
    usuarios = require('../../app/controladores/usuarios.servidor.controladores'),
    passport = require('passport'),
    Imagen = require('../modelos/imagen.servidor.modelo');

module.exports = function (app, passport) {

    // app.route('/registroImagen')
    //     .post(usuarios.solicitarLogin, imagenes.registrarImagenes);

    app.route('/subirImagen')
        .post(usuarios.solicitarLogin, imagenes.subirImagenes);

    app.route('/imagenes')
        //.get(usuarios.solicitarLogin, imagenes.list);
        .get(usuarios.solicitarLoginAdmin, imagenes.list);

    app.route('/listaImagenes')
        .get(imagenes.list);

    app.route('/imagenes/:imagenId')
        .get(usuarios.solicitarLogin, imagenes.read)
        .put(usuarios.solicitarLoginAdmin, imagenes.upDate)
        .delete(usuarios.solicitarLoginAdmin, imagenes.delete)

    app.route('/buscarImagen')
        .post(usuarios.solicitarLoginAdmin, imagenes.buscarImagen)

    app.param('imagenId', imagenes.imagenByID);
    //app.param('imagenId', imagenes.upDate);
};
