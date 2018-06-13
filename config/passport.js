/*Obtener el modulo de dependencias*/
var LocalStrategy    = require('passport-local').Strategy;
var passport = require('passport');
    mongoose = require('mongoose');
//var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport){
  var User = mongoose.model('User');

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done){
    //done(null, user);
    User.findOne({
      _id: id
    }, '-password -salt', function (err, user){
      done(err, user);
    });
  });

  require('./strategies/local.js')();
  require('./strategies/facebook.js')();
}
