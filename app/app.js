const express = require('express');
const api = require('./api/main.js');
const sendViewMiddleware = require('../middlewares.js').sendViewMiddleware;

const app = express();

app.use(sendViewMiddleware);
app.use(express.static('./public/'))
    .use('/api/', api)
    .get('*', function(req, res) {
        res.sendView('index.html');
    })

module.exports = app;
