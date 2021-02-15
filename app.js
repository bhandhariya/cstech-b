var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const  passport  =  require('passport');
const  LocalStrategy  =  require('passport-local').Strategy;
var User=require('./model/user_model')
var app = express();

var db=require('./db')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
      return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(null,false,{message:"user not found"}); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        console.log(user)
        // Return if password is wrong
        if (password != user.password) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
  }
));
passport.serializeUser(function(user, done) {
  if(user) done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

const auth = () => {
  return (req, res, next) => {
      passport.authenticate('local', (error, user, info) => {
          if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
          req.login(user, function(error) {
              if (error) return next(error);
              next();
          });
      })(req, res, next);
  }
}

app.post('/authenticate', auth() , (req, res) => {
  console.log(req.user)
  res.status(200).json({"statusCode" : 200 ,"message" : "hello","data":req.user});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
