const express = require('express');
let expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const routes = require('./routes/router');
const {db} = require('./db/client');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(routes);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
