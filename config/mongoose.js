/*Invocar el modo JavaScript 'strict'*/
'use strict'

/*cargar las dependencias de módulo*/
var config = require('./config'),
    mongoose = require('mongoose');

/*definir el método del conrfiguración de Mongoose*/
module.exports = function(){
  //usar Mongoose para conectar a MongoDB
  mongoose.Promise = global.Promise;
  var db = mongoose.connect(config.db);

  //cargar el modelo'usuario'
  require('../app/modelos/usuario.servidor.modelo');
  require('../app/modelos/imagen.servidor.modelo');

  //Devolver la instancia de conexion a Mongoose
  return db;
};
