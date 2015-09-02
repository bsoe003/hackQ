$("#request").on('click', function() {
    var name = $("#requester_name").val();
    var location = $("#requester_location").val();
    var description = $("#requester_description").val();
    if(name === "" || location === "") return false;
    var key = btoa(JSON.stringify({
        "name": name.toLowerCase(),
        "location": location.toLowerCase(),
        "description": description.toLowerCase()
    }));
    var time = new Date().getTime()
    firebase.child(time.toString()).set({
        id: key,
        name: name,
        location: location,
        description: description,
        time: time
    });
    $("#requester_name").val("");
    $("#requester_location").val("");
    $("#requester_description").val("");
});
