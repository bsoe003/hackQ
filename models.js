const Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	"email": String,
	"password": String
});

var HackathonSchema = new Mongoose.Schema({
	"hackID": String,
	"name": String
	// "admins": [UserSchema],
	// "hackers": [UserSchema],
	// "expiration": Date
});

exports.User = Mongoose.model('User', UserSchema);
exports.Hackathon = Mongoose.model('Hackathon', HackathonSchema);