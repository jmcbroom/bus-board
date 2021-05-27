import _ from "lodash";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";

const Map = ({ center, bearing, zoom, features, stops, mogoFeatures }) => {
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

      // mogo stations
      theMap.addSource("mogo-stations", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: mogoFeatures
        }
      });

      theMap.addLayer({
        id: "mogo-stations-mask",
        source: "mogo-stations",
        type: "circle",
        paint: {
          "circle-color": "rgba(200,0,0,0.5)",
          "circle-stroke-color": "black",
          "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 15, 1, 17, 1.5, 19, 2.5],
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 15, 8, 17, 12, 19, 20]
        }
      });

      theMap.addLayer({
        id: "mogo-stations-icon",
        source: "mogo-stations",
        type: "symbol",
        layout: {
          "icon-image": "bicycle-share-15",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 15, 0.6, 17, 1, 19, 1.5],
          "icon-allow-overlap": true
        }
      });

      theMap.addLayer({
        id: "mogo-stations-labels",
        source: "mogo-stations",
        type: "symbol",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Lato Black"],
          "text-anchor": "top",
          "text-offset": [0, 1],
          "text-justify": "center",
          "text-size": ["interpolate", ["linear"], ["zoom"], 15, 12, 19, 28],
          visibility: "none"
        },
        paint: {
          "text-halo-color": "#fff",
          "text-halo-width": 3,
          "text-color": "#111",
          "text-opacity": 0.75
        }
      });

      theMap.addSource("scooters", {
        type: "geojson",
        data: "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/scooter_availability/FeatureServer/0/query?where=is_disabled%3D0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=vendor&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
        cluster: true,
        clusterRadius: 10
      });


      theMap.addLayer({
        id: "scooters-one",
        source: "scooters",
        filter: ["!", ["has", "point_count"]],
        type: "circle",
        paint: {
          "circle-color": "rgba(36, 171, 242, 0.65)",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 15, 3, 17, 4.5, 19, 6],
          "circle-stroke-color": "rgba(0,0,0,1)",
          "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 15, 0.5, 17, 1, 19, 1.5]
        },
        layout: {
          visibility: "visible"
        }
      });


      theMap.addLayer({
        id: "scooters-many",
        source: "scooters",
        filter: ["has", "point_count"],
        type: "circle",
        paint: {
          "circle-color": "rgba(36, 171, 242, 0.5)",
          "circle-stroke-width": 1,
          "circle-stroke-color": "rgba(0,0,0,0.75)",
          "circle-radius": ["step", ["get", "point_count"], 5, 3, 8, 6, 10, 10, 12]
        },
        layout: {
          visibility: "visible"
        }
      });

      setMap(theMap);
    });
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};

export default Map;
