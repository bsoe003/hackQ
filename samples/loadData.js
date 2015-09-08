const mongoose = require('mongoose');
const filstream = require('fs');
const models = require('../models');
const hackathons = require('./hackathons.json');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/headquarters');
models.Hackathon.find().remove().exec(onceClear);

function onceClear(err) {
    if (err) console.log(err);
    var countdown = hackathons.length;
    var toFile = [];
    for (var i = 0; i < hackathons.length; i++) {
        var hackathon = hackathons[i];
        var hackathon = new models.Hackathon(hackathon);
        toFile.push(hackathon);
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
    filstream.writeFile("samples/output.json", JSON.stringify(toFile), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved to samples/output.json");
    });
}