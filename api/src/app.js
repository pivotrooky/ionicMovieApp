const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;


const routes = require('./routes/index.js');

require("dotenv").config();
const { User} = require("./db.js");


server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

//passport strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) {
            return done(null, false, "User not found :(");
          }
          if (!user.correctPassword(password)) {
            return done(null, false, "Incorrect password :(");
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);


server.use(
  session({
    secret: process.env.PASSPORT_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

//passport middleware
server.use(passport.initialize());
server.use(passport.session());

//our routes
server.use('/', routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;