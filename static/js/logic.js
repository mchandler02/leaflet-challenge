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
    id: "mapbox/light-v10", //many different types of maps available
    accessToken: API_KEY
}).addTo(myMap); //this is what adds the tile layer to the map
// console.log(myMap)

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


// LOOK INTO--NO MARKERS DISPLAYING
d3.json(url).then(function(response) {
    // console.log(L.mapbox)
    // var myLayer = L.mapbox.featuerLayer().setGeoJSON(response.feature).addTo(myMap);
    // console.log(myLayer)
    // console.log(response)
    var markers = L.marker();
    console.log(markers)
    console.log(response.features.length)
    for (var i = 0; i < response.features.length; i++) {
        var location = response.features[i].geometry;
        console.log(location)
        // if (location) {
        //     markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]]))
        //     .bindPopup(response[i].properties.place);
        // }
        if (location) {
            myMap.addLayer(L.marker([location.coordinates[1], location.coordinates[0]]).bindPopup(response.features[i].properties.place));
        }
        console.log(typeof location.coordinates[1]);
    }
    // myMap.addLayer(markers)
}
)
