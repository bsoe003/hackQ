const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv')
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const logger = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override');
const session = require('express-session');

const index = require('./routes/index');
const queue = require('./routes/queue');
const models = require('./models');

var app = express();
var db = mongoose.connection
dotenv.load();

// database connection
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/headquarters');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function (callback) {
	console.log("Database connected succesfully.");
});

// express setup
app.set('port', process.env.PORT || 3000);
app.engine('html', handlebars({ defaultLayout: 'queue', extname: '.html' }));
app.set('view engine', 'html');
app.use(logger("combined"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true,
	resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// passport session setup
passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_APP_ID,
	clientSecret: process.env.FACEBOOK_APP_SECRET,
	profileFields: ['id', 'displayName', 'picture.type(large)']
}, function(accessToken, refreshToken, profile, done) {
	models.User.findOne({ "facebookID": profile.id }, function(err, user) {
		if(err) return done(err);
		var photo_url = profile.photos ? profile.photos[0].value : '/img/dummy_profile.png';
		if(!user) {
			var newUser = new models.User({
				"facebookID": profile.id,
				"name": profile.displayName,
				"picture": new Buffer(photo_url).toString('base64'),
				"accessToken": accessToken
			});
			newUser.save(function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('User: ' + newUser.name +" has been created.");
				}
				return done(null, profile);
			});
		} else {
			var photo_url = profile.photos ? profile.photos[0].value : '/img/dummy_profile.png';
			user.name = profile.displayName;
			user.picture = new Buffer(photo_url).toString('base64');
			user.accessToken = accessToken;
			user.save();
			process.nextTick(function () {
				return done(null, profile);
			});
		}
	});
}));
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

// start web server
app.listen(app.get('port'), function() {
    console.log("Node.js server running on port %s", app.get('port'));
});

// list of routes
app.get('/q/:hack_id', function(req, res) {
	const hackID = req.params.hack_id;
	var query = models.Hackathon.where({"hackID": hackID});
	query.findOne(function(hackError, found) {
		if(hackError) {
			res.status(404).send('Not found');
		} else if (!req.isAuthenticated() || !req.user.id) {
			var result = {};
			result.hackathon = found;
			res.render('add_form', result);
		} else {
			query = models.User.where({ "facebookID": req.user.id });
			query.findOne(function(userError, user) {
				if(userError) return userError;
				var result = {};
				result.hackathon = found;
				if(user) {
					result.user = {};
					result.user.facebookID = user.facebookID;
					result.user.name = user.name;
					result.user.picture = user.picture;
				}
				res.render('add_form', result);
			});
		}
	});
});

app.get('/auth/facebook', function(req, res, next) {
	passport.authenticate('facebook', {
		callbackURL: '/auth/facebook/callback?queue='+req.query.queue
	})(req, res, next);
});
app.get('/auth/facebook/callback', function(req, res, next) {
	passport.authenticate('facebook', {
		callbackURL: '/auth/facebook/callback?queue='+req.query.queue,
		failureRedirect: '/q/'+req.query.queue,
		successRedirect: '/q/'+req.query.queue
	})(req, res, next);
});
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/q/'+req.query.queue);
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated() && !!req.user.facebookID) { 
		return next(); 
	}
	res.redirect('/');
}