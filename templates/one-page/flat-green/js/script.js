// if HTML DOM Element that contains the map is found...
if (document.getElementById('map-canvas')){
    // Coordinates to center the map
    var myLatlng = new google.maps.LatLng(30.783333333333335,31);
    // Other options for the map, pretty much selfexplanatory
    var mapOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Attach a map to the DOM Element, with the defined settings
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}