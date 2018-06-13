'use strict';

module.exports = {
  //cambiar puesto que es un palabra secreta
  //db: 'mongodb://localhost/rutas' || 'mongodb://rutas:123456789@ds117819.mlab.com:17819/dbrutas',
  db:'mongodb://rutas:123456789@ds117819.mlab.com:17819/dbrutas' || 'mongodb://localhost/rutas',
  sessionSecreta: 'developmentSessionSecret',
  facebook: {
		/*clientID: '451690625216144',
		clientSecret: 'eaef6532969851a8f8591bb2e84130e5',*/
    clientID: '1292572167502585',
		clientSecret: 'e0c8630e6600f66562fd5aedb3f22c52',
		callbackURL: 'http://localhost:8080/ingresarUsuarioFacebook/callback'
	}
};



/*URI GENERICA DE MONGO
mongodb://nombreusuario:password@hostname:puerto/basedatos

URI EN INSTANCIA localhost
mongodb://localhost/mean*/
