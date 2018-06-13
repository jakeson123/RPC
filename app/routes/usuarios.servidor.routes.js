'use strict';

/*Cargar controlador y autenticador 'passport'*/
var usuarios = require('../../app/controladores/usuarios.servidor.controladores'),
    passport = require('passport');

/*Define el route para los usuarios*/
module.exports = function (app, passport) {
    app.route('/registroUsuario')
        .post(usuarios.registrarUsuario);

    app.route('/ingresarUsuario')
        .post(usuarios.ingresarUsuario);

    app.route('/ingresarUsuarioFacebook')
        .get(usuarios.ingresarUsuarioFacebook);

    app.route('/ingresarUsuarioFacebook/callback')
        .get(usuarios.ingresarUsuarioFacebookCallback);

    app.route('/users')
        .post(usuarios.solicitarLoginAdmin, usuarios.create)
        .get(usuarios.solicitarLoginAdmin, usuarios.list)

    app.route('/users/:userId')
        .get(usuarios.solicitarLogin, usuarios.read)
        .put(usuarios.solicitarLoginAdmin, usuarios.upDate)
        .delete(usuarios.solicitarLoginAdmin, usuarios.delete);

    app.route('/buscarUsuario')
        .post(usuarios.solicitarLoginAdmin, usuarios.buscarUsuario)

    app.route('/logeado')
        .get(usuarios.logeado);

    app.route('/salir')
        .get(usuarios.solicitarLogin, usuarios.salir);


    app.param('userId', usuarios.userByID);
    app.param('userId', usuarios.upDate);
    app.param('userId', usuarios.delete);
};
