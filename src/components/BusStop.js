import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Header, Label, Image, Segment, Transition } from "semantic-ui-react";
import dayjs from 'dayjs';
import PanelHeader from './PanelHeader';

let ddotDirections = {
  "Larned": {
    "stops": ["DDOT_5247", "DDOT_5249", "DDOT_9694"],
    "routes": {
      3: "Eastbound to Beaubien & Jefferson",
      4: "Northbound to State Fair",
      5: "Northbound to E 8 Mile & Federal Ave",
      6: "Northbound to 8 Mile & Gratiot",
      9: "Eastbound to Maryland & Jefferson",
      40: "Northbound to E Outer Drive & Van Dyke",
      52: "Northbound to Nevada & Van Dyke",
      67: "Eastbound to Moross & Mack",
      92: "Eastbound to St Antoine & Larned",
      95: "Northbound to E Outer Drive & Van Dyke",
      96: "Eastbound to St Antoine & Larned"
    }
  },
  "Jefferson": {
    "stops": ["DDOT_969", "DDOT_223", "DDOT_9956"],
    "routes": {
      3: "Westbound to Grandview & Grand River",
      6: "Southbound to Third & Michigan",
      9: "Westbound to Rosa Parks Transit Center",
      16: "Northbound to JL Hudson Drive & Greenfield",
      92: "Westbound to Evergreen & Pembroke",
      96: "Westbound to Evergreen & Capitol"
    }
  }
};

const processSmart = c => {
  let time = dayjs()
    .add(Number(c.prdctdn === "DUE" ? 0 : c.prdctdn), "minute")
    .valueOf();
  let split = c.des.toUpperCase().split(" TO ");
  return {
    agency: "SMART",
    routeNum: c.rt,
    routeName: split[0],
    routeDir: c.rtdir,
    destination: split[1],
    arrivalTime: time,
    displayArrivalTime: dayjs(time).format("h:mm"),
    original: c
  };
};

const processDdot = (c) => {
  let time = c.predictedArrivalTime > 0 ? c.predictedArrivalTime : c.scheduledArrivalTime;
  let formattedTime = dayjs(time).format("h:mm");

  // route direction lookup
  let direction = '';
  let stops = ["Larned", "Jefferson"];
  for (let s of stops) {
    for (let sid of ddotDirections[s].stops) {
      if (sid === c.stopId) {
        direction = ddotDirections[s].routes[Number(c.routeShortName)]
        direction = direction.toUpperCase().split(" TO ");
      }
    }
  }

  return {
    agency: "DDOT",
    routeNum: Number(c.routeShortName),
    routeName: `${c.routeLongName}`,
    routeDir: direction[0],
    destination: direction[1],
    arrivalTime: time,
    displayArrivalTime: formattedTime,
    original: c
  };
};

const BusStop = ({ busStop }) => {

  // set up a tick for our real-time data refresh
  const [tick, setTick] = useState(new Date());
  useEffect(() => {
    let tick = setInterval(() => {
      setTick(new Date());
    }, 120000);
    return () => clearInterval(tick);
  }, []);
  
  // set up ddot
  const [ddot, setDdot] = useState([]);
  useEffect(() => {
    let ddotUrl = `https://api.ddot.info/api/where/arrivals-and-departures-for-stop`;
    const urls = busStop.stops.ddot.map(s => `${ddotUrl}/DDOT_${s}.json?key=BETA&format=json&includePolylines=false`);
    Promise.all(urls.map(u => fetch(u)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(predictions => {
        console.log(predictions)
        setDdot(
          _.flatten(predictions.map(s => s.data.entry.arrivalsAndDepartures))
            .map(t => processDdot(t))
            .sort((a, b) => a.arrivalTime - b.arrivalTime)
        );
      });
  }, [tick]);

  // set up smart
  const [smart, setSmart] = useState([]);
  useEffect(() => {
    const urls = busStop.stops.smart.map(s => `http://localhost:34567/smart?stopId=${s}`);
    Promise.all(urls.map(u => fetch(u)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(predictions => {
        setSmart(
          _.flatten(predictions.map(s => s["bustime-response"].prd))
            .map(t => processSmart(t))
            .sort((a, b) => a.arrivalTime - b.arrivalTime)
        );
      });
  }, [tick]);

  let grouped = _.groupBy(ddot.concat(smart), t => t.routeName);
  let routes = Object.keys(grouped).filter(r => busStop.exclude.indexOf(r) === -1);
  
  // only show departure times for routes that layover at one of these stops
  let layoverRoutes = ['DEXTER', 'WOODWARD'];
  for (let l of layoverRoutes) {
    if (l in grouped) {
      let departuresOnly = _.filter(grouped[l], function(o) {
        return o.original.stopSequence === 0;
      });

      grouped[l] = departuresOnly;
    }
  }

  // only show one departure time for routes that stops at more than one stops along street
  let doubleStops = ['JEFFERSON'];
  for (let d of doubleStops) {
    if (d in grouped) {
      let oneStopOnly = _.uniqBy(grouped[d], function(e) {
        return e.original.tripId;
      });

      grouped[d] = oneStopOnly;
    }
  }

  return (
    <div style={{fontFamily: 'Inter'}}>
      <PanelHeader title={busStop.title} />
      <Transition.Group as={Segment.Group} duration={500}>
        {/* <Segment.Group> */}
        {routes.length > 0 &&
          routes
            .sort((a, b) => grouped[a][0].arrivalTime - grouped[b][0].arrivalTime)
            .slice(0, 8)
            .map(r => {
              let sample = grouped[r][0];
              return (
                <Segment size="large" key={r}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <Label
                        size="huge"
                        color={sample.agency === "DDOT" ? "green" : "red"}
                        style={{
                          padding: sample.routeNum < 11 ? 0 : 10,
                          marginRight: 5,
                          fontSize: "1.6em",
                          fontWeight: 500
                        }}
                        circular={sample.routeNum < 11 ? true : false}
                      >
                        {sample.routeNum}
                      </Label>
                      <span
                        style={{
                          fontSize: "1.5em",
                          fontWeight: 700,
                          paddingLeft: 5
                        }}
                      >
                        {r
                          .split(new RegExp("[ &/]", "g"))
                          .map(t => _.capitalize(t))
                          .join(" ")
                          .replace("Fast", "FAST")
                          .replace("P R", "P&R")}
                      </span>
                    </div>

                    <Image
                      src={
                        sample.agency === "DDOT"
                          ? "https://upload.wikimedia.org/wikipedia/commons/4/48/Ddot-logo.jpg"
                          : "https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/11/e4/62/11e46248-f65a-2c7b-0c40-7e2b2963f549/AppIcon-0-1x_U007emarketing-0-85-220-0-5.png/246x0w.jpg"
                      }
                      style={{ height: 25, marginTop: 5 }}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: "1.3em",
                      fontWeight: 500,
                      padding: "10px 0px 0px 0px"
                    }}
                  >
                    {/* Only show the first four predictions for any route; TBD ddot directions */}
                    <span style={{ fontWeight: 300 }}>{_.upperFirst(_.lowerCase(grouped[r][0].routeDir))} at </span>
                    <span style={{ fontWeight: 700 }}>
                      {grouped[r]
                        .slice(0, 4)
                        .map(t => t.displayArrivalTime)
                        .join(", ")}
                    </span>
                  </div>
                </Segment>
              );
            })}
      </Transition.Group>
    </div>
  )
}

export default BusStop;