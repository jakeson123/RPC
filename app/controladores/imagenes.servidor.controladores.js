'use strict';

/*Cargar el model Mongoose 'Imagen'*/
var Imagen = require('mongoose').model('Imagen'),
    fs = require('fs'),
    passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'correo ya existente2';
                break;
            default:
                message = 'Se ha producido un error';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
}

/*
  //Crear una nueva intancia del model Mongoose 'user'
  var imagen = new Imagen(solicitud.body);
  //usar el metodo 'save' para salvar el nuevo documento user
  imagen.save(function(err) {
    if (err) {
      var messages = getErrorMessage(err);
      console.log(messages);
      return respuesta.status(400).send(messages);
    } else {
      console.log(solicitud);
      respuesta.json(imagen);
      subir(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(solicitud.file);
          //respuesta.json(imagen);
          respuesta.json({
            success: true,
            messages: 'Imagen subida'
          })
        }
      })
  }})
};

//Crear un nuevo método controller 'create'
exports.list = function(solicitud, respuesta, next) {
  //Usa el método static 'user' 'find' para recuperrar la lista de usuarios
  User.find({}, function(err, imagenes) {
    if (err) {
      //Llamar al siguiente meddleware con el mensaje de error
      return (next(err));
    } else {
      //Usar el objeto 'response' para enviar una respuesta JSON
      respuesta.json(imagenes);
    }
  })
}*/

/*exports.crear = function(solicitud, respuesta, next) {
//Crear una nueva intancia del model Mongoose 'user'
var imagen = new Imagen(solicitud.body);
//usar el metodo 'save' para salvar el nuevo documento user
imagen.save(function(err) {
  if (err) {
    var messages = getErrorMessage(err);
    console.log(messages);
    return respuesta.status(400).send(messages);
  } else {
    respuesta.json(imagen);
}})
};*/

// exports.registrarImagenes = function(solicitud, respuesta, next) {
//   //Crear una nueva intancia del model Mongoose 'user'
//   var imagen = new Imagen(solicitud.body);
//
//   //usar el metodo 'save' para salvar el nuevo documento user
//   imagen.save(function(err) {
//     if (err) {
//       var messages = getErrorMessage(err);
//       console.log(messages);
//       return respuesta.status(400).send(messages);
//     } else {
//       respuesta.json(imagen);
//     }
//   })
// };

// exports.registrarImagenes = function (solicitud, respuesta, next) {
//     //Crear una nueva intancia del model Mongoose 'user'
//     var imagen = new Imagen(solicitud.body);
//
//     //usar el metodo 'save' para salvar el nuevo documento user
//     imagen.save(function (err) {
//         if (err) {
//             var messages = getErrorMessage(err);
//             console.log(messages);
//             return respuesta.status(400).send(messages);
//         } else {
//             respuesta.json(imagen);
//         }
//     })
// };

exports.subirImagenes = function (solicitud, respuesta, next) {

    if (!solicitud.files)
        return respuesta.status(400).send('no se puedo subir el archivo');

    var imagen = new Imagen(solicitud.body);
    console.log(solicitud.body);
    var imagenArchivo = solicitud.files.arc,
        ext = (imagenArchivo.name).slice((imagenArchivo.name.lastIndexOf(".") - 1 >>> 0) + 2);
    imagen.extension = ext;
    imagen.ruta = 'imagenes/'+ imagen._id + '.' + ext;

    //usar el metodo 'save' para salvar el nuevo documento user
    imagen.save(function (err) {
        if (err) {
            var messages = getErrorMessage(err);
            console.log(messages);
            return respuesta.status(400).send(messages);
        } else {
            imagenArchivo.mv('./public/imagenes/' + imagen._id + '.' + ext , function (err) {
                if (err)
                    return respuesta.status(500).send(err);
                //respuesta.json(imagen);
                respuesta.redirect('./#!/');
                //respuesta.end();
                //respuesta.send('Archivo subido');
            });
        }
    })


}


exports.crear = function (solicitud, respuesta, next) {

    //Crear una nueva intancia del model Mongoose 'user'
    var imagen = new Imagen(solicitud.body);
    //usar el metodo 'save' para salvar el nuevo documento user
    imagen.save(function (err) {
        if (err) {
            var messages = getErrorMessage(err);
            console.log(messages);
            return respuesta.status(400).send(messages);
        } else {
            respuesta.json(imagen);
        }
    })
};


/*Crear un nuevo método controller 'create'*/
exports.list = function (solicidud, respuesta, next) {
    //Usa el método static 'user' 'find' para recuperrar la lista de usuarios
    Imagen.find({}, function (err, imagenes) {
        if (err) {
            //Llamar al siguiente meddleware con el mensaje de error
            return (next(err));
        } else {
            //Usar el objeto 'response' para enviar una respuesta JSON
            respuesta.json(imagenes);
        }
    })
}

exports.read = function (solicidud, respuesta) {
    respuesta.json(solicidud.user);
}

/*exports.delete = function(solicidud, respuesta, next, id) {

    //Usar el método 'remove' de la instancia 'User' para eliminar documentos
    Imagen.ruta = null;
    Imagen.remove(function(err, user) {
        if (err) {
            //Llamar al siguiente meddleware con el mensaje de error
            return (next(err));
        } else {
            //Usar el objeto 'response' para enviar una respuesta JSON
            respuesta.json(user);
        }
    })
}*/

exports.delete = function(req, res) {
    var imagen = req.imagen;
    imagen.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(imagen);
        }
    });
};

/*Crear un nuevo método controller 'create'*/
exports.buscarImagen = function (solicitud, respuesta, next) {
    //Usa el método static 'user' 'find' para recuperrar la lista de usuarios
     Imagen.find({
        'titulo': {
            "$regex" : solicitud.body.palabra,
            "$options" : 'i.m'
            //"$search": req.body.query
        }
    }, function (err, imagenes) {
        if (err) {
            //Llamar al siguiente meddleware con el mensaje de error
            return (next(err));
        } else {
            //Usar el objeto 'response' para enviar una respuesta JSON
            respuesta.json(imagenes);
        }
    })
}

/*Crear un nuevo método controller 'update'*/
exports.upDate = function (solicidud, respuesta, next, id) {
    // Usar el método static 'findOne' de 'User' para recurpar un usuario especifico
    Imagen.findByIdAndUpdate(id, solicidud.body, function (err, imagen) {
        if (err) {
            //Llamar al siguiente meddleware con el mensaje de error
            return (next(err));
        } else {
            //Usar el objeto 'response' para enviar una respuesta JSON
            respuesta.json(imagen);
        }
    })
}

/*Crear un nuevo método controller 'userByID'*/
exports.imagenByID = function (solicidud, respuesta, next, id) {
    // Usar el método static 'findOne' de 'User' para recurpar un usuario especifico
    Imagen.findOne({
        _id: id
    }, function (err, imagen) {
        if (err) {
            //Llamar al siguiente meddleware con el mensaje de error
            return (next(err));
        } else {
            //configurar la propiedad 'solicidud.user'
            solicidud.imagen = imagen;

            //Llamar al siguiernte middleware
            next();
        }
    });
}
