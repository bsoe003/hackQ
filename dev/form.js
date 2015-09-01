$("#request").on('click', function() {
    var name = $("#requester_name").val();
    var location = $("#requester_location").val();
    if(name === "" || location === "") return false;
    var key = "{name:\""+name.toLowerCase()+"\",location:\""+location.toLowerCase()+"\"}"
    key = btoa(key);
    var time = new Date().getTime()
    firebase.child(time.toString()).set({
        id: key,
        name: name,
        location: location,
        time: time
    });
});