var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../model/user_model');

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};

passport.use(new LocalStrategy(
    // function of username, password, done(callback)
    function(username, password, done) {
      // look for the user data
      User.findOne({ username: username }, function (err, user) {
        // if there is an error
        if (err) { return done(err); }
        // if user doesn't exist
        if (!user) { return done(null, false, { message: 'User not found.' }); }
        // if the password isn't correct
        if (!user.verifyPassword(password)) { return done(null, false, {   
        message: 'Invalid password.' }); }
        // if the user is properly authenticated
        return done(null, user);
      });
    }
  ));