import { faBicycle, faBolt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Panel, PanelHeader } from './Panel';

const MoGo = ({ stations, stationInfo }) => {

  // MoGo station information
  const [stationStatus, setStationStatus] = useState(null);

  useEffect(() => {
    const url = `https://det.publicbikesystem.net/ube/gbfs/v1/en/station_status`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setStationStatus(d.data.stations);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {stationInfo && stationStatus && stations.map(s => {
        let station = stationInfo.filter(st => st.station_id === s.toString())[0]
        let status = stationStatus.filter(st => st.station_id === s.toString())[0]
        return (
          <Panel key={s} width='full'>
            <PanelHeader title={station.name.replace("Square", "Sq")} textSize="sm" icon={faBicycle}/>
            <div className="bg-gray-100 p-2 grid gap-1">
              <div className="flex items-center justify-between">
                <div className="w-12 flex items-center justify-around">
                <FontAwesomeIcon icon={faBicycle} className="text-lg m-2" />
                </div>
                <p className="text-lg">{status.num_bikes_available_types.mechanical} bikes available</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-12 flex items-center justify-around">
                <FontAwesomeIcon icon={faBolt} className="text-lg m-2" />
                </div>
                <p className="text-lg">{status.num_bikes_available_types.ebike} e-bikes available</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-12 flex items-center justify-around">
                  <FontAwesomeIcon icon={faSignInAlt} className="text-lg m-2" />
                </div>
                <p className="text-lg">{status.num_docks_available} open docks</p>
              </div>
              {/* <p>e-bikes</p> */}
              {/* <FontAwesomeIcon icon={faSignInAlt} /> */}
              {/* <p>docks</p> */}
            </div>
          </Panel>
        )

      })}
    </div>
  )
}

export default MoGo;