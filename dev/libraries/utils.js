String.prototype.contains = function(substring) {
    return this.indexOf(substring) !== -1;
}

var firebase = new Firebase("https://hackq.firebaseio.com/hackers");
