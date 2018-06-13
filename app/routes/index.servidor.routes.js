/*Invocar el modo JavaScript 'strict'*/
'use strict';

//module exportar varias funciones
module.exports=function(app){
    var index = require('../controladores/index.servidor.controladores');
    app.get('/', index.render);
}
