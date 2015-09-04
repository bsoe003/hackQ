const mongoose = require('mongoose');
const models = require('../models');
const hackathons = require('./hackathons.json');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/headquarters');
models.Hackathon.find().remove().exec(onceClear);

function onceClear(err) {
    if (err) console.log(err);
    var countdown = hackathons.length;
    for (var i = 0; i < hackathons.length; i++) {
        var hackathon = hackathons[i];
        var hackathon = new models.Hackathon(hackathon);
        console.log(hackathon);
        hackathon.save(function(err, user) {
            if (err) console.log(err);
            countdown--;
            console.log(countdown + ' left to save');
            if (countdown <= 0) {
                console.log('DONE');
                mongoose.connection.close();
            }
        });
    }
}