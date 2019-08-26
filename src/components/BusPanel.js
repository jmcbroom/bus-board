import React from 'react';
import BusStop from './BusStop';

let innerGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '1em'
}

const BusPanel = ({ busStops }) => {
  return (
    <div style={{gridArea: 'b', ...innerGridStyle}}>
      {busStops.map(busStop => (
        <BusStop busStop={busStop} />
      ))}
    </div>
  )
}

export default BusPanel;
