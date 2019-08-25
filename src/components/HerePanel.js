import React from 'react';
import PanelHeader from './PanelHeader';
import Map from './Map';

const HerePanel = ({ center, scooters }) => {
  return (
    <div style={{gridArea: 'h'}}>
      <PanelHeader title={`COLEMAN A. YOUNG MUNICIPAL CENTER`} />
      <Map center={center} scooters={scooters}/>
    </div>
  )
}

export default HerePanel;
