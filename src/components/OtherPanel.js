import React from "react";
import distance from "@turf/distance";
import { Segment, Header, Statistic } from "semantic-ui-react";

import PanelHeader from "./PanelHeader";
import MoGo from "./MoGo";

const OtherPanel = ({ center, scooters, mogoStations }) => {
  let panelStyle = {
    gridArea: "o",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em"
  };

  let nearbyScooters;

  if (Object.keys(scooters).indexOf("features") > -1) {
    nearbyScooters = [60, 200, 800].map(n => {
      return scooters.features.filter(s => {
        return distance(s.geometry, center, { units: "meters" }) < n;
      });
    });
  }

  return (
    <div style={panelStyle}>
      <MoGo stations={mogoStations} />
      <div>
        <PanelHeader title={"Scooters"} />
        {nearbyScooters && (
          <>
          <Segment.Group horizontal compact style={{fontFamily: "Lato"}}>
            <Segment size={`large`}>
              <Header as='h3' content={`${nearbyScooters[0].length} scooters`} />
              nearby
            </Segment>
            <Segment size={`large`}>
              <Header as='h3' content={`${nearbyScooters[1].length} scooters`} />
              within a 5 min walk
            </Segment>
          </Segment.Group>
          <Segment.Group style={{fontFamily: "Lato"}}>
            <Segment.Group horizontal>
              <Segment style={{background: 'rgba(0,0,0,0.2)', width: 165}}>
                <Header as='h3' content="Bird" subheader="www.bird.co" />
              </Segment>
              <Segment>
                $1 to start + 31&#162; per minute
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment style={{background: 'rgba(2, 221, 3, 0.5)', width: 165}}>
              <Header as='h3' content="Lime" subheader="www.li.me" />
              </Segment>
              <Segment>
                $1 to start + 27&#162; per minute
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment style={{background: 'rgba(255, 86, 56, 0.5)', width: 165}}>
              <Header as='h3' content="Spin" subheader="www.spin.app" />
              </Segment>
              <Segment>
                $1 to start + 27&#162; per minute
              </Segment>
            </Segment.Group>
          </Segment.Group>
          </>
        )}
      </div>
      {/* <div>
        <PanelHeader title={"Ridehail"} />
      </div> */}
    </div>
  );
};

export default OtherPanel;
