var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
        passport.use('local', new LocalStrategy({
                    // by default, local strategy uses username and password, we will override with email
                    usernameField: 'correo',
                    passwordField: 'contrasenia',
                    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
                },
                function(req, correo, contrasenia, hecho) {
                    if (correo)
                        correo = correo.toLowerCase();

                    process.nextTick(function() {
                            User.findOne({'correo': correo}, function(err, user) {
                                if (err) {
                                    return hecho(err);
                                }

                                if (!user) {
                                    return hecho(null, false, {
                                        message: 'correo Desconocido'
                                    });
                                }

                                if (!user.validaContrasenia(contrasenia)) {
                                    return hecho(null, false, {
                                        message: 'Contaseña invalida'
                                    });
                                }

                                return hecho(null, user);
                            })
                        })
                    }));
        };
