// Stored API 

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";


d3.json(url).then(function(quakeData) {
    

    console.log(quakeData);

    makeFeatures(quakeData.features);

});


// Created dots with size increases, which affect color, based on depth and magnitude 

function createMarker(feature, latlon) {
    return L.circleMarker(latlon, {
        fillColor: makeColor(feature.geometry.coordinates[2]),
        radius: markerSize(feature.properties.mag),
        opacity: 0.8,
        fillOpacity: 1,
        color:"#100",
        weight: 1
        
    });
}

function makeFeatures(quakeData) {

    
// Used lecture videos and notes for module 15 

    function onEachFeature(feature, layer) {

        layer.bindPopup(`<h3>Location:</h3> ${feature.properties.place}<h3> Magnitude:</h3> ${feature.properties.mag}<h3> Depth:</h3> ${feature.geometry.coordinates[2]}`);
    
      }



// Used lecture videos and notes for module 15 


    var quakes = L.geoJSON(quakeData, {

        onEachFeature: onEachFeature,

        pointToLayer: createMarker

    });



    // Used lecture videos and notes for module 15 


    createMap(quakes);
}

function createMap(quakes) {

    // https://leafletjs.com/examples/quick-start/

    var area = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        
      });


    // Made a map

   // Used lecture videos and notes for module 15. And ask BCS

    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [area, quakes]
    });

// Used lecture videos and notes for module 15. And ask BCS

    L.control.layers(mainMap, overlayMap, {

        collapsed: false

    }).addTo(map); 
    
    // https://leafletjs.com/examples/choropleth/

    // https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map

    var legend = L.control({position: "bottomright"});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            degrees = [-10, 10, 30, 60, 90],
            list = [],
            legend = '<h5>Magnitude</h5>';

        for (var i = 0; i < degrees.length; i++) {

            div.innerHTML +=

            '<i style="background:' + makeColor(degrees[i] + 1) + '"></i> ' +

                degrees[i] + (degrees[i + 1] ? '&ndash;' + degrees[i + 1] + '<br>' : '+');

        }    

        return div;

        };


        // Adding a legend to the map


        legend.addTo(myMap);
}


// Marker size is based on magnitude


function markerSize(mag) {

    return mag * 5;

}


// Dot color is based on depth

// https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map

// https://www.w3schools.com/tags/ref_colornames.asp

function makeColor(depth) {

    return depth > 90 ? "#DC143C" :
          depth > 70 ? "#FF8C00" :
          depth > 50 ? "#FFD700" :
          depth > 30 ? "#008000" :
          depth > 10 ? "#8FBC8F" :
                       "#ADFF2F" ;   

}