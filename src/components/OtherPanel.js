import React from "react";
import distance from "@turf/distance";
import { Segment } from "semantic-ui-react";

import PanelHeader from "./PanelHeader";
import MoGo from "./MoGo";

const OtherPanel = ({ center, scooters }) => {
  let panelStyle = {
    gridArea: "o",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em"
  };

  let nearbyScooters;

  if (Object.keys(scooters).indexOf("features") > -1) {
    nearbyScooters = [30, 400, 800].map(n => {
      return scooters.features.filter(s => {
        return distance(s.geometry, center, { units: "meters" }) < n;
      });
    });
  }

  console.log(nearbyScooters);

  return (
    <div style={panelStyle}>
      <MoGo stations={[12, 15, 18]} />
      <div>
        <PanelHeader title={"Scooters"} />
        {nearbyScooters && (
          <Segment.Group>
            <Segment>{nearbyScooters[0].length} scooters in the plaza</Segment>
            <Segment>{nearbyScooters[1].length} scooters in the plaza</Segment>
            <Segment>{nearbyScooters[2].length} scooters in the plaza</Segment>
          </Segment.Group>
        )}
      </div>
      {/* <div>
        <PanelHeader title={"Ridehail"} />
      </div> */}
    </div>
  );
};

export default OtherPanel;
