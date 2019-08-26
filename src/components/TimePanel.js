import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"

dayjs.extend(advancedFormat);

const TimePanel = ({ center }) => {

  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let tick = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:34567/darksky?lon=${center[0]}&lat=${center[1]}`)
      .then(r => r.json())
      .then(d => {
        // console.log(d)
        setWeather(d);
      });
  }, []);

  let panelStyle = {
    gridArea: 't',
    background: '#044555',
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    fontFamily: "Lato"
  }

  let dateStyle = { fontSize: 20, fontWeight: 400, lineHeight: 1.2};
  let hmaStyle = { fontSize: 30, fontWeight: 700, lineHeight: 1 };
  let weatherStyle = { fontSize: 20, fontWeight: 400, lineHeight: 1.2 };

  return (
    <div style={panelStyle}>
      <span style={dateStyle}>{dayjs(date).format("dddd, MMMM D")}</span>
      <span style={hmaStyle}>{dayjs(date).format("h:mm:ss a")}</span>
      {weather && <span style={weatherStyle}>{weather.hourly.summary}</span>}
    </div>
  )
}

export default TimePanel;