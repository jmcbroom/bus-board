import React from 'react';
import PanelHeader from './PanelHeader';
import MoGo from './MoGo';

const OtherPanel = ({ scooters }) => {

  let panelStyle = {
    gridArea: 'o',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '1em'
  }

  return (
    <div style={panelStyle}>
      <MoGo stations={[12, 15, 18]} />
      <div>
        <PanelHeader title={'Scooters'} />
      </div>
      <div>
        <PanelHeader title={'Ridehail'} />
      </div>
    </div>
  )
}

export default OtherPanel;