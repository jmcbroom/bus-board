import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import _ from 'lodash';

const Map = ({ scooters, center }) => {

  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg";
    var theMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/cityofdetroit/cjti2ea3l898y1fpi3mc8f7az",
      center: center, // starting position
      zoom: 16.001, // starting zoom
      bearing: -29.5
    });

    setMap(theMap);

    theMap.on("load", () => {
      console.log('loaded')

      theMap.addSource("scooters", {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": []
        },
        cluster: true,
        clusterRadius: 30
      })

      theMap.addLayer({
        "id": "scooters",
        "source": "scooters",
        "type": "circle",
        "paint": {
          "circle-color": "rgba(10,0,0,0.2)",
          "circle-stroke-width": 1,
          "circle-stroke-color": 'rgba(0,0,0,0.6)',
          "circle-radius": [
            "step",
            ["get", "point_count"],
            0.5,
            2,
            9,
            5,
            13,
            8,
            16
            ]
        }
      })

      theMap.addLayer({
        id: "scooter-count",
        type: "symbol",
        source: "scooters",
        filter: ["has", "point_count"],
        layout: {
        "text-field": "{point_count_abbreviated}",
        "text-size": 12
        }
        });
    });
  }, []);

  useEffect(() => {
    if(map) {
      map.getSource("scooters").setData(scooters)
    }
    console.log(scooters)
  }, [scooters])

  return <div id="map" style={{ height: 'calc(50vh - 2em)' }} />;
};

export default Map;
