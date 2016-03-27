/**
 * Created by di on 26.3.16.
 */

// Show the user's position on a Google map.
function showMap(lat, lon) {
    // Create a LatLng object with the GPS coordinates.
    var myLatLng = new google.maps.LatLng(lat, lon);
    // Create the Map Options
    var mapOptions = {
        zoom: 8,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Generate the Map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Add a Marker to the Map
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Found you!'
    });
}

window.onload = function() {
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {
        // Get the location
        var lat, lon;
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            // Show the map
            showMap(lat, lon);
        });
        var sendButton = document.getElementById('send-button')
        sendButton.addEventListener('click', function (event) {
            var req = new XMLHttpRequest()
            req.open('GET', '/location?' + 'lon=' + lon +'&lat='+lat, true)
            req.send(null)
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status === 200) {
                    console.log(req.responseText, 'great job');
                }
            }
        })
    } else {
        // Print out a message to the user.
        document.write('Your browser does not support GeoLocation');
    }
}