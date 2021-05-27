import { faBicycle, faBolt, faCog, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BusStop from "./BusStop";
import MoGo from './MoGo'
import Map from './Map'
import Weather from "./Weather";
import MapLegend from './MapLegend';

const GridArea = ({ gridArea, children, className }) => {

  let style = {
    gridArea: gridArea
  }

  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}

const AreaTitle = ({ title, children }) => (
  <h1 className="detroit-title text-2xl flex items-center justify-between">
    {children}
  </h1>
)

const AreaSubtitle = ({ subtitle, children }) => (
  <h2 className="text-lg pt-1 mb-2">    
    {children}
  </h2>
)

const BusBoard = ({ stops, locationOptions, features, stationInfo }) => {

  let { short, long, mogo, zoom, bearing, center } = locationOptions;

  console.log(mogo, stationInfo)

  let mogoFeatures = stationInfo.filter(s => mogo.indexOf(parseInt(s.station_id)) > -1).map(m => {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [m.lon, m.lat]
      },
      "properties": {
        "name": m.name
      }
    }
  })

  console.log(mogoFeatures)

  return (
    <div className="App">

      <GridArea gridArea="l">
        <AreaTitle>
          {short}
          {/* <Link to={`/configure`}>
            <FontAwesomeIcon icon={faCog} className="text-gray-300" />
          </Link> */}
        </AreaTitle>
        <AreaSubtitle>
          {long}
        </AreaSubtitle>
        <div className="grid gap-2">

          <Weather {...{center}} />
          <MapLegend />
        </div>
      </GridArea>

      <GridArea gridArea='h'>
        <Map {...{zoom, bearing, center, features, stops, mogoFeatures}}/>
      </GridArea>

      <GridArea gridArea='b'>
        <AreaTitle>
          DDOT/SMART bus stops
        </AreaTitle>
        <AreaSubtitle>
          Purchase a fare on your phone through the DART app
        </AreaSubtitle>
        <div className="flex flex-col flex-wrapbus">
          {stops.map(stop => {
            return (
              <BusStop key={stop.id} {...{stop}} />
              )
          })}
        </div>
      </GridArea>

      <GridArea gridArea='o'>
        <AreaTitle>
          MoGo bike sharing stations
        </AreaTitle>
        <AreaSubtitle>
        Rent MoGo bicycles through the Transit app.
        </AreaSubtitle>
        {/* <div className="text-gray-700 text-base my-1">
           Showing available bikes
           <FontAwesomeIcon icon={faBicycle} className="mx-2" />
          , available e-bikes
          <FontAwesomeIcon icon={faBolt} className="mx-2" />
          and available docks <FontAwesomeIcon icon={faSignInAlt} className="mx-1" /> for each station.
        </div> */}
        <MoGo stations={mogo} stationInfo={stationInfo} />
      </GridArea>

    </div>
  )
}

export default BusBoard;