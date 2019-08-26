import React, { useState, useEffect } from "react";
import _ from "lodash";
import "styling/semantic.less";
import "./index.css";
import "./App.css";

import HerePanel from "./components/HerePanel";
import BusPanel from "./components/BusPanel";
import OtherPanel from "./components/OtherPanel";
import TimePanel from "./components/TimePanel";

// configuration object for the whole app
let config = {
  // the title of the screen
  title: `COLEMAN A. YOUNG MUNICIPAL CENTER`,
  // the coordinates to center on
  coords: [-83.0453376, 42.329009],
  // MoGo station IDs to highlight
  mogoStations: [12, 15, 18],
  // An array of bus stop panels
  busStops: [
    {
      // title of the panel
      title: "Larned Buses",
      // arrays of bus stop IDs for each provider
      stops: {
        smart: [23822],
        ddot: [5247, 5249, 9694]
      },
      // don't show routes with these names here (maybe it's the end of the route)
      exclude: ["GRAND RIVER", "FAST WOODWARD", "FAST MICHIGAN"]
    },  
    {
      title: "Jefferson Buses",
      stops: {
        smart: [23823],
        ddot: [969, 223, 9956]
      },
      exclude: []
    },
  ]
};

const App = () => {

  // set up scooters here
  const [scooters, setScooters] = useState({});
  useEffect(() => {
    let scooterUrls = [`https://web.spin.pm/api/gbfs/v1/detroit/free_bike_status`, `http://localhost:34567/lime`, `http://localhost:34567/bird`];

    Promise.all(scooterUrls.map(u => fetch(u)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(predictions => {
        let scooterFeatures = _.flatten(predictions.map(s => s.data.bikes)).map(sc => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [sc.lon, sc.lat]
            }
          };
        });

        setScooters({ type: "FeatureCollection", features: scooterFeatures });
      });
  }, []);

  return (
    <div className="App">

      {/* The map and title */}
      <HerePanel center={config.coords} title={config.title}  scooters={scooters} />

      {/* Buses */}
      <BusPanel busStops={config.busStops} />

      {/* MoGo & scooters */}
      <OtherPanel center={config.coords} mogoStations={config.mogoStations} scooters={scooters}  />

      {/* Time & weather */}
      <TimePanel center={config.coords} />

    </div>
  );
};

export default App;
