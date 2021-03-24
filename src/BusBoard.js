import { faCog } from "@fortawesome/free-solid-svg-icons";
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
  <h2 className="text-base pt-1">    
    {children}
  </h2>
)

const BusBoard = ({ stops, locationOptions, features }) => {

  let { short, long, mogo, zoom, bearing, center } = locationOptions;

  return (
    <div className="App">

      <GridArea gridArea="l">
        <AreaTitle>
          {short}
          <Link to={`/configure`}>
            <FontAwesomeIcon icon={faCog} className="text-gray-300" />
          </Link>
        </AreaTitle>
        <AreaSubtitle>
          {long}
        </AreaSubtitle>
        <Weather {...{center}} />
        <MapLegend />
      </GridArea>

      <GridArea gridArea='h'>
        <Map {...{zoom, bearing, center, features, stops}}/>
      </GridArea>

      <GridArea gridArea='b'>
        <AreaTitle>
          DDOT/SMART bus stops
        </AreaTitle>
        <AreaSubtitle>
          Purchase a fare on your phone through the DART app
        </AreaSubtitle>
        <div className="flex flex-col flex-wrap h-4/5">
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
          Rent MoGo bicycles through the Transit app
        </AreaSubtitle>
        <MoGo stations={mogo} />
      </GridArea>

    </div>
  )
}

export default BusBoard;