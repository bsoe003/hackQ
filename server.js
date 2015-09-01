const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');

const index = require('./routes/index');
const queue = require('./routes/queue');

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('html', handlebars({defaultLayout: 'queue', extname: '.html'}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// server
app.listen(app.get('port'), function() {
    console.log("Node.js server running on port %s", app.get('port'));
});

// list of routes
// app.get('/', index.view);
// app.get('/q/sample', sample.main);
// app.get('/q/sample/request', sample.request);
app.get('/', queue.view)