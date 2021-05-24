// console.log("logic.js importing")

var myMap = L.map("mapid", {
    center: [0, 0], //latitude comes first
    zoom: 2
});
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10", 
    accessToken: API_KEY
}).addTo(myMap); 
// console.log(myMap)

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(url).then(function (response) {
    var markers = L.circleMarker();
    console.log(markers)
    console.log(response.features.length)
    for (var i = 0; i < response.features.length; i++) {
        var location = response.features[i].geometry;
        var magnitude = response.features[i].properties.mag;
        var depth = response.features[i].geometry.coordinates[2];
        // console.log(location)
        if (location) {
            myMap.addLayer(L.circleMarker([location.coordinates[1], location.coordinates[0]], {radius: magnitude*2})
            .bindPopup("<h3>" + "Magnitude: " + magnitude + "</h3>"+ "<h3>"+ "Depth: " + depth));
        }
        console.log(location.coordinates[2]);
    }
}
)
