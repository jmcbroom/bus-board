import React, { useState, useEffect } from "react";
import { Header, Card, Segment, Label, Statistic } from "semantic-ui-react";
import _ from "lodash";
import PanelHeader from "./PanelHeader";

const MoGo = props => {
  const [now, setNow] = useState(new Date());
  const [stationInfo, setStationInfo] = useState([]);
  const [bikeInfo, setBikeInfo] = useState([]);

  useEffect(() => {
    const url = `https://det.publicbikesystem.net/ube/gbfs/v1/en/station_information`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setStationInfo(d.data.stations);
      });
  }, []);

  useEffect(() => {
    let tick = setInterval(() => {
      setNow(new Date());
    }, 120000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const url = `https://det.publicbikesystem.net/ube/gbfs/v1/en/station_status`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setBikeInfo(d.data.stations);
      });
  }, [now]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start"
      }}
    >
      <PanelHeader title={`MoGo Bikeshare`} />
      <Segment.Group>
        {props.stations.map(s => {
          let info = stationInfo.filter(i => parseInt(i.station_id) === s)[0];
          let bikes = bikeInfo.filter(i => i.station_id === s.toString())[0];
          return (
            info &&
            bikes && (
              <Segment key={s} style={{padding: 10}}>
                <Header as='h3' content={info.name} />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <Label size="big" color="red" content={`${bikes.num_bikes_available} bikes`} />
                    <Label size="big" color="grey" content={`${bikes.num_docks_available} docks`} />
                  </div>
                </div>
              </Segment>
            )
          );
        })}
      </Segment.Group>
    </div>
  );
};

export default MoGo;
