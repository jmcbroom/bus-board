import _ from "lodash";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";

const Map = ({ center, bearing, zoom, features, stops }) => {
  const [map, setMap] = useState(null);

  let youAreHere = features.filter(f => f.id === 'you-are-here')[0]

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg";

    var theMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/cityofdetroit/ck0k4xoaj2doz1cqnkpexy32x",
      center: center, // starting position
      bearing: bearing ? bearing : 0,
      zoom: zoom // starting zoom
    });

    theMap.on("load", () => {

      theMap.addSource("you-are-here", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "Point", coordinates: youAreHere.geometry.coordinates }
        }
      });

      theMap.addLayer({
        id: "you-are-here-circle",
        source: "you-are-here",
        type: "circle",
        paint: {
          "circle-color": "rgba(251, 182, 59, 0.75)",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 15, 9, 19, 14],
          "circle-stroke-color": "#444",
          "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 15, 1, 19, 2.5]
        }
      });

      theMap.addLayer({
        id: "you-are-here",
        source: "you-are-here",
        type: "symbol",
        layout: {
          "icon-image": "star-15",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 0.75, 17, 1, 19, 1.25],
          "icon-allow-overlap": true
        }
      });

      // bus stops
      theMap.addSource("bus-stops", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stops
        }
      });

      theMap.addLayer({
        id: "bus-stops",
        source: "bus-stops",
        type: "circle",
        paint: {
          "circle-color": "rgba(114, 166, 116, 0.5)",
          "circle-opacity": 1,
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 15, 10, 19, 18],
          "circle-stroke-color": "#444",
          "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 15, 1, 19, 2.5]
        }
      });

      theMap.addLayer({
        id: "bus-stops-icons",
        source: "bus-stops",
        type: "symbol",
        layout: {
          "icon-image": "bus-15",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 0.75, 17, 1, 19, 1.25],
          "icon-allow-overlap": true
        }
      });

      theMap.addLayer({
        id: "bus-stops-labels",
        source: "bus-stops",
        type: "symbol",
        layout: {
          "text-field": ["get", "title"],
          "text-max-width": 6,
          "text-font": ["Lato Black"],
          "text-anchor": ["get", "anchor"],
          "text-offset": ["get", "offset"],
          "text-justify": ["get", "justify"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 15, 12, 19, 28]
        },
        paint: {
          "text-halo-color": "#fff",
          "text-halo-width": 3,
          "text-color": "#111",
          "text-opacity": 0.75
        }
      });

      setMap(theMap);

    });
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};

export default Map;
