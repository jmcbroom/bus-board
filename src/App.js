import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BusBoard from './BusBoard';
import Configure from './Configure';
import React, {useState} from 'react';
import caymc from './locations/caymc.json'

function App() {

  const [locationOptions, setLocationOptions] = useState(caymc.features[0].properties)
  const [stops, setStops] = useState(caymc.features.filter(f => f.id.indexOf('bus-stop') > -1))
  const [features, setFeatures] = useState(caymc.features.filter(f => f.id.indexOf('bus-stop') === -1))

  return (
    <Router>
      <Switch>
        <Route path="/configure">
          <Configure {...{locationOptions, setLocationOptions, stops, setStops}}/>
        </Route>
        <Route path="/">
          <BusBoard {...{locationOptions, stops, features}} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
