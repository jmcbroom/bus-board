import React, { useState, useEffect } from "react";
import _ from "lodash";
import "styling/semantic.less";
import "./index.css";
import "./App.css";

import HerePanel from "./components/HerePanel";
import BusPanel from "./components/BusPanel";
import OtherPanel from "./components/OtherPanel";
import TimePanel from "./components/TimePanel";

let config = {
  coords: [-83.0453376, 42.329009],
  mogo: []
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
      <HerePanel center={config.coords} scooters={scooters} />
      <BusPanel />
      <OtherPanel center={config.coords} scooters={scooters} />
      <TimePanel />
    </div>
  );
};

export default App;
