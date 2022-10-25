import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BusBoard from './BusBoard';
import Configure from './Configure';
import React, {useState, useEffect} from 'react';
import caymc from './locations/caymc.json'

function App() {

  const [locationOptions, setLocationOptions] = useState(caymc.features[0].properties)
  const [youAreHere, setYouAreHere] = useState(caymc.features.filter(f => f.id === 'you-are-here'))
  const [stops, setStops] = useState(caymc.features.filter(f => f.id.indexOf('bus-stop') > -1))
  const [features, setFeatures] = useState(caymc.features.filter(f => f.id.indexOf('bus-stop') === -1))
  const [stationInfo, setStationInfo] = useState(null)

  useEffect(() => {
    const url = `https://det.publicbikesystem.net/ube/gbfs/v1/en/station_information`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setStationInfo(d.data.stations);
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/configure">
          <Configure {...{locationOptions, setLocationOptions, stops, setStops}}/>
        </Route>
        <Route path="/">
          {stationInfo && <BusBoard {...{locationOptions, stops, features, stationInfo}} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
