import { faBus } from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import _ from "lodash";
import React, { useEffect, useState } from 'react';
import ddot from './img/ddot.jpg';
import smart from './img/smart.jpg';
import { Panel, PanelHeader } from './Panel';
import routes from './routes.js';


const processPrediction = ({ c, props }) => {
  console.log(c)
  let time = dayjs()
    .add(Number(c.prdctdn === "DUE" ? 0 : c.prdctdn), "minute")
    .valueOf();
  // let rt = routes.filter(r => r.number === Number(c.rt))[0];
  return {
    agency: parseInt(c.rt) < 100 ? "DDOT" : "SMART",
    routeNum: c.rt,
    routeName: c.rt,
    // routeName: rt.name,
    routeDir: _.lowerCase(c.rtdir),
    destination: c.des,
    // destination: rt.directions[c.rtdir],
    minsAway: c.prdctdn === "DUE" ? 0 : parseInt(c.prdctdn),
    arrivalTime: time,
    displayArrivalTime: dayjs(time).format("h:mm"),
  };
};

const BusStop = ({ stop }) => {

  let [next, setNext] = useState([])

  useEffect(() => {
    const smartUrls = stop.properties.smart.map(s => `/.netlify/functions/stop?stopId=${s}&provider=smart`);
    const ddotUrls = stop.properties.ddot.map(s => `/.netlify/functions/stop?stopId=${s}&provider=ddot`);
    Promise.all(smartUrls.concat(ddotUrls).map(u => fetch(u)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(predictions => {
        let filtered = predictions.filter(p => Object.keys(p["bustime-response"]).indexOf("prd") > -1);
        let p = _.flatten(filtered.map(s => s["bustime-response"].prd))
          .map(c => processPrediction({ c }))
          .sort((a, b) => a.arrivalTime - b.arrivalTime)
        setNext(p)
        console.log(p)
      });
  }, [stop.properties])

  let grouped = _.groupBy(next, t => t.routeName)
  let keys = Object.keys(grouped).filter(r => stop.properties.exclude.indexOf(parseInt(r)) === -1 && r !== "Exclude");
  return (
    <Panel>
      <PanelHeader title={stop.properties.title} icon={faBus} />
      <div className="grid gap-2">
        {next.length > 0 && keys.map(rt => {
          let bus = grouped[rt][0]
          return (
            <div key={rt} className="bg-gray-100 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center w-1/6">
                  <div
                    className={
                      bus.agency === "DDOT" ?
                        "bg-green-700 w-10 route-number" :
                        "bg-red-500 w-10 route-number"
                    }>

                    {bus.routeName}
                  </div>
                </div>
                <div className="w-3/4">
                  <p className="font-semibold">{routes[rt].title}</p>
                  <p className="text-sm text-gray-600 leading-tight">{bus.routeDir.replace("bound", "")} to {routes[rt][bus.routeDir.replace("bound", "")]}</p>
                </div>
                <img
                  src={bus.agency === "DDOT" ? ddot : smart}
                  style={{ height: 20, opacity: "0.75" }}
                  alt={`${bus.agency} logo`}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold">in {bus.minsAway} min</p>
                <p>{bus.displayArrivalTime}</p>
              </div>
            </div>
          )
        })}
      </div>

    </Panel>
  )
}

export default BusStop;