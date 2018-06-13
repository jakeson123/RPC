/*Obtener el modulo de dependencias*/
var config = require('./config'),
    session = require('express-session'),
    express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    //methodOverride = require('method-override'),
    //flash = require('connect-flash'),
    //multer = require('multer'),
   // formidable = require('express-formidable'),

    //formidable = require('express-form-data'),
    cookieParser = require('cookie-parser'),
    fileUpload = require('express-fileupload');
    passport = require('passport');

//upload = multer({ dest: '/uploads'});


/*Definir el método de configuración de Express*/
module.exports = function () {
    //Crear una nueva instancia de la aplicacion Express
    var app = express();


    //Usar la varible 'NODE_ENV' para activar los middlware 'morgan' logger o 'compress'
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(fileUpload({  safeFileNames: true, preserveExtension: true}));

    /*app.use(formidable ({
      encoding: 'utf-8',
      uploadDir: '/my/dir',
      multiples: true
    }));*/

    //configurar el middleware 'body-parser' y el 'method-override'
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    //app.use(methodOverride());

    //configurar el middleware 'session''
    app.use(cookieParser());
    app.use(session({
        //saveUninitializaed: true,
        //resave: true,
        secret: config.sessionSecreta
    }));

    //Configuarar el motor view de la aplicacion y el directorio de 'views'
    app.set('views', './app/views');
    app.set('view engine', 'ejs');


    //app.use(flash());

    //configurar el middleware 'passport'
    app.use(passport.initialize());
    app.use(passport.session());

    //Configurar el serviddor de archivos estáticos
    app.use(express.static('./public'));

    //Cargar los archivos de enrutamiento
    require('../app/routes/imagenes.servidor.routes.js')(app, passport);
    require('../app/routes/index.servidor.routes.js')(app);
    require('../app/routes/usuarios.servidor.routes.js')(app, passport);

    //app.use(formidable({keepExtensions: true, uploadDir:"app/images"}));
    /*app.use(formidable({
        encoding: 'utf-8',
        multiples: true // esta almacena archivos
    }))*/
    //app.use(formidable.parse({keepExtensions: true}));
    //Devolver la instancia de la aplicación Express
    return app;
}
