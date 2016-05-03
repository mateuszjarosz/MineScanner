var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}

var onSuccess = function (position) {

    var geocodingAPI = "http://seadog.mateuszjarosz.com/location.php?lat=" + position.coords.latitude + "&lang=" + position.coords.longitude + ".json";

    $.getJSON(geocodingAPI, function (json) {
        window.postal_code = json.postcode.replace(/\s/g, '');
        outcomePostal(window.postal_code).delay(5000);
    });

};

function outcomePostal(postcode_outcome) {
    if (typeof window.postal_code === "undefined") {

    } else {
        document.getElementById("postcodesearch").value = postcode_outcome;
    }
}

// onError Callback receives a PositionError object
//
function onError(error) {
    /*    if(error.code = 1){
     alert("You need to allow MineScanner to access your location. You can do that in your privacy settings.")
     } else {*/
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    //   }
}

document.getElementById("search").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

document.getElementById("postcodebutton").addEventListener("click", function () {
    var geocodingPS = "http://seadog.mateuszjarosz.com/?postcode=" + document.getElementById('postcodesearch').value;

    $.getJSON(geocodingPS, function (json) {
        window.resultcode = json.result;
        alertResult(window.resultcode).delay(5000);
    });

});

function alertResult(result) {
    if (result == 3) {
        alert("Metalliferous mining search required");
    } else if (result == 2) {
        alert("Bathstone mining search required")
    } else if (result == 1) {
        alert("No mining required!")
    } else {
        alert("There was a problem with your request. Check your postcode or try again later!")
    }
}


/*
document.addEventListener('deviceready', function () {

    ThreeDeeTouch.configureQuickActions([
        {
            type: 'checkin', // optional, but can be used in the onHomeIconPressed callback
            title: 'Check in', // mandatory
            subtitle: 'Quickly check in', // optional
            iconType: 'Compose' // optional
        }]);

    ThreeDeeTouch.onHomeIconPressed = function (payload) {
        if (payload.type == 'checkin') {
            var geocodingAPI = "http://seadog.mateuszjarosz.com/location.php?lat=" + position.coords.latitude + "&lang=" + position.coords.longitude + ".json";

            $.getJSON(geocodingAPI, function (json) {
                window.postal_code = json.postcode.replace(/\s/g, '');
                outcomePostal(window.postal_code).delay(5000);
            });

            var geocodingPS = "http://seadog.mateuszjarosz.com/?postcode=" + document.getElementById('postcodesearch').value;

            $.getJSON(geocodingPS, function (json) {
                window.resultcode = json.result;
                alertResult(window.resultcode).delay(5000);
            })
        }
    }

});*/
