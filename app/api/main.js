const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();

const localStrategy = require('../auth/local_strategy.js')(passport);

///////////////////////////////////////////
//  DB Connection
//////////////////////////////////////////
mongoose.connect('mongodb://localhost/checklist');

///////////////////////////////////////////
//  Router Middlewares
//////////////////////////////////////////
router
    .use(morgan('dev'))//log every request to the console
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))// session secret
    .use(passport.initialize())
    .use(passport.session())//persistent login sessions
    .use(flash());//connect flash for flash messages


module.exports = router;
