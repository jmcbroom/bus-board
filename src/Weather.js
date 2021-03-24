import { faClock, faCloudRain, faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'
import {Panel, PanelHeader} from './Panel'
import {useState, useEffect} from 'react';
import _ from 'lodash';
import dayjs from 'dayjs'

const Weather = ({ center }) => {

  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let tick = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    fetch(`/.netlify/functions/darksky?lon=${center[0]}&lat=${center[1]}`)
      .then(r => r.json())
      .then(d => {
        console.log(d);
        setWeather(d);
        console.log(
          _.upperCase(d.currently.icon)
            .replace("-", "_")
            .replace(" ", "_")
        );
      });
  }, []);

  return (
    <>
    <Panel width='full'>
      <PanelHeader icon={faThermometerEmpty} title='Weather' />
      {weather &&
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold">
            {`${Math.ceil(weather.currently.temperature)}`}&#176;
          </span>
          <p className="text-xl">
            {`${weather.currently.summary.toLowerCase()}`}
          </p>
        </div>
        <p className="w-1/2 text-right ">
          {weather.hourly.summary}
        </p>
      </div>
      }
    </Panel>
    <Panel width='full'>
      <PanelHeader icon={faClock} title='Date and time' />
      <div className="bg-gray-100 p-4">
        <p className="text-2xl font-thin mb-1">
          {dayjs(date).format("dddd, MMMM D")}
        </p>
        <p className="text-3xl font-extrabold">
          {dayjs(date).format("h:mm:ss a")}
        </p>
      </div>
    </Panel>
    </>
  )
}

export default Weather;