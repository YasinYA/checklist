const express = require('express');
const api = require('./api/main.js');

const app = express();

app.use(express.static('./public/'))
    .use('/api/', api)
    .get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    })

module.exports = app;
