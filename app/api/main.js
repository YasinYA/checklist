const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

const Users = require('../models/users.js');
const Checklist = require('../models/checklist.js');
require('../auth/local_strategy.js')(passport);
const secret = process.env.SESSION_SECRET;
const salt = bcrypt.genSaltSync(10);

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
        secret: secret,
        resave: false,
        saveUninitialized: false
    }))// session secret
    .use(passport.initialize())
    .use(passport.session());//persistent login sessions

router
    .route('/login')
    .post(passport.authenticate('local'), (req, res) => {
        Users.findById({_id: req.user.id}, (err, user) => {
            if(err) {
                return res.status(400).send({
                    success: false,
                    message: err.message
                });
            }
            res.status(200).send({
                user: user.username,
                success: true,
                message: 'User is Logged in Successfully'
            });
        });
    });

router
    .route('/signup')
    .post((req, res) => {
        let data = req.body;

        if(data) {
            bcrypt.hash(data.password, salt, null, (err, hash) => {
                if(err) {
                    throw err;
                }
                data.password = hash;
                Users.create(data, (err, user) => {
                    if(err) {
                        return res.status(400).send({
                            success: false,
                            message: err.message
                        });
                    }
                    res.status(200).send({
                        user: user.username,
                        success: true,
                        message: 'Created User Successfully'
                    });
                }); 
            });
        }
        else {
            res.send({
                success: false,
                message: 'User Data Must be provided'
            });
        }
    });

router
    .route('/edit-user')
    .post((req, res) => {
        if(req.user) {
            let data = req.body;

            Users.findById({id:data.id}, (err, user) => {
                if(err) {
                    res.status(400).send({
                        success: false,
                        message: err.message
                    });
                }
                data.password = bcrypt.hash(data.password) || user.password;
                Users.updateUser(user.id, data, (err, updatedUser) => {
                    if(err) {
                        res.status(400).send({
                            success: false,
                            message: err.message
                        });
                    }
                    res.send({
                        user: updatedUser,
                        success: true,
                        message: 'Updated User Successfully'
                    });
                });
            });

        } else {
            res.status(401).send({
                success: false,
                message: 'You are not Authoriezed to carry out this action'
            });
        }

    });

router
    .route('/checklist')
    .get((req, res) => {
        if ( req.user ) {
            let userId = req.user.id;
            Checklist.getall(userId, (err, list) => {
                if(err) {
                    res.status(400).send({
                        success: false,
                        message: err.message
                    });
                }
                res.send({
                    checklist: list,
                    success: true
                });
            });
        }
        res.status(401).send({
            success: false,
            message: 'You are not Authoriezed to carry out this action'
        });
    });

module.exports = router;
