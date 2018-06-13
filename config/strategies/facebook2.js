var passport = require('passport'),
    //url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    //usuarios = require('../../app/controladores/usuarios.servidor.controladores.js'),
    User = require('mongoose').model('User');

module.exports = function() {

    passport.use('facebook', new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            passReqToCallback: true
        },
        //function(token, refreshToken, profile, done) {
        function(req, accessToken, refreshToken, profile, done) {
            // asynchronous

            var providerData = profile._json;
      			providerData.accessToken = accessToken;
      			providerData.refreshToken = refreshToken;

            var newUser = new User();
            //newUser.ids = profile.id;
            //newUser.token = token;
            newUser.nombre = profile.name.givenName ;
            newUser.apellido = profile.name.familyName;
            newUser.correo = profile.emails[0].value;
            newUser.contrasenia = 'facebook';
            newUser.terminosyCondiciones = true;
            newUser.provider = 'facebook';
            newUser.providerId = profile.id;
            newUser.providerData = providerData;

            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
            /*console.log('holaya')
            process.nextTick(function() {

                User.findOne({
                    //'correo':  profile.emails[0].value
                }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {


                    }

                };
            })*/
        }))
};
