const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const index = require('./routes/index');
const queue = require('./routes/queue');
const models = require('./models');

var app = express();
var db = mongoose.connection

// database connection
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/headquarters');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function (callback) {
	console.log("Database connected succesfully.");
});

// express setup
app.use(passport.initialize());
app.use(passport.session());
app.set('port', process.env.PORT || 3000);
app.engine('html', handlebars({defaultLayout: 'queue', extname: '.html'}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// passport session setup
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});
passport.use(new Strategy(function(email, password, done) {
	process.nextTick(function() {
		models.User.findOne({
			'email': email
		}, function(err, user) {
			if(err) return done(err);
			if(!user) return done(null, false);
			if(user.password != password) return done(null, false);
			return done(null, user);
		});
	});
}));

// start web server
app.listen(app.get('port'), function() {
    console.log("Node.js server running on port %s", app.get('port'));
});

// list of routes
app.get('/q/:hack_id', function(req, res) {
	const hackID = req.params.hack_id;
	models.Hackathon.findById(hackID, function(err, found) {
		if(err) res.status(404).send('Not found');
		res.render('add_form', found);
	});
});
