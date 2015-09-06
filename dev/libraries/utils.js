String.prototype.contains = function(substring) {
    return this.indexOf(substring) !== -1;
}

var pathname = window.location.pathname;
var firebase = new Firebase("https://hackq.firebaseio.com" + pathname + "/hackers");
pathname = pathname.replace("/q/", "");
pathname = pathname.replace("#_=_", "");
