import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Layout from './Layout';

const BusStopConfigure = ({ stop, stops, setStops, setStopSlugs }) => {

  let thisStop = stops[stop]

  let [title, setTitle] = useState(thisStop.title)
  let [ddotStops, setDdotStops] = useState(thisStop.stops.ddot)
  let [smartStops, setSmartStops] = useState(thisStop.stops.smart)

  return (
    <div className="bg-purple-100 p-3 mb-3">
      <div className="flex items-center justify-between">
        <pre className="font-bold">{stop}</pre>
        <FontAwesomeIcon icon={faWindowClose} onClick={() => {
          let newStops = stops
          delete newStops[stop]
          setStopSlugs(Object.keys(newStops))
          setStops(newStops)
        }} />
      </div>
      <label for="stopTitle" className="config-label">
        <span>Long title:</span>
        <input
          type="text"
          className="bg-gray-100 p-2 w-1/2"
          name="stopTitle"
          value={title}
          onChange={(e) => {
            let newStops = stops
            newStops[stop].title = e.target.value
            setTitle(e.target.value)
            setStops(newStops)
          }}
        />
      </label>

      <label for="ddotStops" className="config-label">
        <span>DDOT stops:</span>
        <input
          type="text"
          className="bg-gray-100 p-2 w-1/2"
          name="stopTitle"
          value={ddotStops}
          onChange={(e) => {
            let newStops = stops
            newStops[stop].stops.ddot = e.target.value.split(',')
            setDdotStops(e.target.value.split(','))
            setStops(newStops)
          }}
        />
      </label>

      <label for="smartStops" className="config-label">
        <span>SMART stops:</span>
        <input
          type="text"
          className="bg-gray-100 p-2 w-1/2"
          name="smartStops"
          value={smartStops}
          onChange={(e) => {
            let newStops = stops
            newStops[stop].stops.smart = e.target.value.split(',')
            setSmartStops(e.target.value.split(','))
            setStops(newStops)
          }}
        />
      </label>
    </div>
  )
}

const Configure = ({ locationOptions, setLocationOptions, stops, setStops }) => {


  useEffect(() => {
    console.log(stops)
  }, [stops])

  let [stopSlugs, setStopSlugs] = useState(Object.keys(stops))
  let [newStopName, setNewStopName] = useState('')

  return (
    <Layout title='Configuration'>
      <div className="flex">
        <p className="w-1/4 p-2">
          Configure location options here.
        </p>
        <div className="bg-yellow-200 p-4 border border-2 w-3/4">
          <label for="long" className="config-label">
            <span>Long title:</span>
            <input
              type="text"
              className="bg-gray-100 p-2 w-1/2"
              name="long"
              value={locationOptions.long}
              onChange={(e) => setLocationOptions({ ...locationOptions, long: e.target.value })}
            />
          </label>

          <label for="short" className="config-label">
            <span>Short title:</span>
            <input
              type="text"
              className="bg-gray-100 p-2 w-1/2"
              name="long"
              value={locationOptions.short}
              onChange={(e) => setLocationOptions({ ...locationOptions, short: e.target.value })}
            />
          </label>

          <label for="center" className="config-label">
            <span>Map center</span>
            <div className="flex items-center justify-end w-3/4">
              <input
                type="text"
                className="bg-gray-100 p-2 w-1/4"
                name="long"
                value={locationOptions.center.lng}
                onChange={(e) => setLocationOptions({ ...locationOptions, center: { ...locationOptions.center, lng: e.target.value } })}
              />
              <input
                type="text"
                className="bg-gray-100 p-2 w-1/4"
                name="long"
                value={locationOptions.center.lat}
                onChange={(e) => setLocationOptions({ ...locationOptions, center: { ...locationOptions.center, lat: e.target.value } })}
              />
            </div>
          </label>

          <label for="center" className="config-label">
            <span>You are here</span>
            <div className="flex items-center justify-end">
              <input
                type="text"
                className="bg-gray-100 p-2 w-1/4"
                name="youAreHereLng"
                value={locationOptions.youAreHere.lng}
                onChange={(e) => setLocationOptions({ ...locationOptions, youAreHere: { ...locationOptions.youAreHere, lng: e.target.value } })}
              />
              <input
                type="text"
                className="bg-gray-100 p-2 w-1/4"
                name="youAreHereLat"
                value={locationOptions.youAreHere.lat}
                onChange={(e) => setLocationOptions({ ...locationOptions, youAreHere: { ...locationOptions.youAreHere, lat: e.target.value } })}
              />
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/4">
          <p>Configure bus stops here</p>
          <p>Add a new stop:</p>
          <input type="text" onChange={(e) => setNewStopName(e.target.value)} />
          <button onClick={() => {

            let newStops = stops
            stops[newStopName] = {
              title: 'New Title',
              stops: {
                ddot: [],
                smart: []
              }
            }
            setStopSlugs(Object.keys(newStops))
            setStops(newStops)

          }}>Add new</button>
        </div>
        <div className="bg-purple-200 p-4 border border-2 overflow-hidden w-3/4">
          {stopSlugs.map(s => <BusStopConfigure stop={s} key={s} {...{stops, setStops, setStopSlugs}} />)}
        </div>
      </div>
    </Layout>
  )
}

export default Configure;