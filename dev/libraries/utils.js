String.prototype.contains = function(substring) {
    return this.indexOf(substring) !== -1;
}

var pathname = window.location.pathname;
pathname = pathname.replace("#_=_", "");
var firebase = new Firebase("https://hackq.firebaseio.com" + pathname + "/hackers");
pathname = pathname.replace("/q/", "");
$(document).ready(function() {
    var search = $("#search").height();
    var sidebar = $("#aside").height();
    $("#queueWrapper").height(sidebar-search);
});