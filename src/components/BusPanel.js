import React from 'react';
import BusStop from './BusStop';

let busStops = [
  {
    title: "Larned Buses",
    stops: {
      smart: [23822],
      ddot: [5247, 5249, 9694]
    },
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

let innerGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '1em'
}

const BusPanel = () => {
  return (
    <div style={{gridArea: 'b', ...innerGridStyle}}>
      {busStops.map(busStop => (
        <BusStop busStop={busStop} />
      ))}
    </div>
  )
}

export default BusPanel;
