$("#request").on('click', function() {
    var name = $("#requester_name").val();
    var location = $("#requester_location").val();
    var description = $("#requester_description").val();
    var image = $("#pid").text();
    if(name === "" || location === "" || description == "") return false;
    var time = new Date().getTime();
    firebase.child(time.toString()).set({
        name: name,
        location: location,
        description: description,
        image: image ? atob(image) : "/img/dummy_profile.png",
        time: time
    });
    $("#requester_location").val("");
    $("#requester_description").val("");
});
