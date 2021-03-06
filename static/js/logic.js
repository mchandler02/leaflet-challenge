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
    // console.log(markers)
    // console.log(response.features.length)
    for (var i = 0; i < response.features.length; i++) {
        var location = response.features[i].geometry;
        var magnitude = response.features[i].properties.mag;
        var depth = response.features[i].geometry.coordinates[2];
        if (depth < 100) {
            var color = "#ffff00"
        }
        else if (depth < 200) {
            var color = "#ffcc00"
        }
        else if (depth < 300) {
            var color = "#ff9900"
        }
        else if (depth < 400) {
            var color = "#ff6600"
        }
        else if (depth < 500) {
            var color = "#ff3300"
        }
        else {
            var color = "#ff0000"
        };
        // console.log(location)
        if (location) {
            myMap.addLayer(L.circleMarker([location.coordinates[1], location.coordinates[0]], { radius: (magnitude**2)/2, color: color })
                .bindPopup("<h3>" + "Magnitude: " + magnitude + "</h3>" + "<h3>" + "Depth: " + depth + "</h3>"));
        }
        // console.log(location.coordinates[2]);
    }
}
)
var legend = L.control({
    position: "bottomright"
});
legend.onAdd = function (myMap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Depth of Earthquake</h4>";
    div.innerHTML += '<i style="background: #ffff00"></i><span><100 km</span><br>';
    div.innerHTML += '<i style="background: #ffcc00"></i><span><200 km</span><br>';
    div.innerHTML += '<i style="background: #ff9900"></i><span><300 km </span><br>';
    div.innerHTML += '<i style="background: #ff6600"></i><span><400 km</span><br>';
    div.innerHTML += '<i style="background: #ff3300"></i><span><500 km</span><br>';
    div.innerHTML += '<i style="background: #ff0000"></i><span>≥500 km</span><br>';
    return div;
}
legend.addTo(myMap);
// console.logs(legend);