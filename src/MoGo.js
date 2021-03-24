import { faBicycle, faBolt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Panel, PanelHeader } from './Panel';

const MoGo = ({ stations }) => {

  // MoGo station information
  const [stationInfo, setStationInfo] = useState(null);
  const [stationStatus, setStationStatus] = useState(null);

  useEffect(() => {
    const url = `https://det.publicbikesystem.net/ube/gbfs/v1/en/station_information`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setStationInfo(d.data.stations);
      });
  }, []);

  useEffect(() => {
    const url = `https://det.publicbikesystem.net/ube/gbfs/v1/en/station_status`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setStationStatus(d.data.stations);
      });
  }, []);

  return (
    <div className="flex flex-col flex-wrap h-4/5">
      {stationInfo && stationStatus && stations.map(s => {
        let station = stationInfo.filter(st => st.station_id === s.toString())[0]
        let status = stationStatus.filter(st => st.station_id === s.toString())[0]
        return (
          <Panel key={s}>
            <PanelHeader title={station.name} icon={faBicycle}/>
            <div className="flex">
              <div className="w-1/3 bg-white flex items-center justify-around px-4 mr-1 h-12 text-xl font-semibold">
                <FontAwesomeIcon icon={faBicycle} />
                {status.num_bikes_available_types.mechanical}
              </div>
              <div className="w-1/3 bg-white flex items-center justify-around px-4 mr-1 h-12 text-xl font-semibold">
                <FontAwesomeIcon icon={faBolt} />
                {status.num_bikes_available_types.ebike}
              </div>
              <div className="w-1/3 bg-white flex items-center justify-around px-4 h-12 text-xl font-semibold">
                <FontAwesomeIcon icon={faSignInAlt} />
                {status.num_docks_available}
              </div>
            </div>
          </Panel>
        )

      })}
    </div>
  )
}

export default MoGo;