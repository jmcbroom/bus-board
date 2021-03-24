import { faBus, faMapMarkedAlt, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Panel, PanelHeader } from "./Panel"

const MapLegend = () => {
  return (
    <Panel width='full'>
      <PanelHeader icon={faMapMarkedAlt} title="Map legend" />
      <div className="flex items-center bg-gray-100 p-3 border-b-2">
        <div className="bg-yellow-300 w-8 h-8 border-2 border-black flex items-center justify-around rounded-full">
          <FontAwesomeIcon icon={faStar} />
        </div>
        <p className="ml-3">You are here</p>
      </div>
      <div className="flex items-center bg-gray-100 p-3 border-b-2">
        <div className="bg-green-800 bg-opacity-30 w-8 h-8 border-2 border-black flex items-center justify-around rounded-full">
          <FontAwesomeIcon icon={faBus} />
        </div>
        <p className="ml-3">Bus stop</p>
      </div>
      <div className="flex items-center bg-gray-100 p-3 border-b-2">
      <svg viewBox="0 0 50 50" width={32} height={32} xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <polygon
                style={{ fill: `rgb(255, 255, 255)`, fillOpacity: 0.5 }}
                points="11.992 24.445 15.154 5.583 34.923 5.623 38.179 24.587 37.93 24.345"
                ></polygon>
              <rect x="11" y="28" width="28" height="4" style={{ fill: `rgb(216, 216, 216)` }}></rect>
              <rect x="15" y="39.9" width="20" height="6.1" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="5" y="36" width="40" height="4" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="5" y="31" width="3" height="6" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="42" y="31" width="3" height="6" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="15" y="33" width="3" height="3" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="32" y="33" width="3" height="3" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="11" y="30" width="28" height="3" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="11" y="24" width="28" height="4" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <path d="M 11 24 L 14 5 L 16 5 L 13 24 Z" style={{ fill: `rgb(62, 107, 171)` }}></path>
              <path d="M 39 24 L 36 5 L 34 5 L 37 24 Z" style={{ fill: `rgb(62, 107, 171)` }}></path>
              <path d="M 14 5 L 15 4.5 L 35 4.5 L 36 5 L 36 6.5 L 14 6.5 L 14 5 Z" style={{ fill: `rgb(62, 107, 171)` }}></path>
              <line style={{ strokeWidth: `0.5px`, fill: `rgb(62, 107, 171)` }} x1="11" y1="28" x2="39" y2="28"></line>
              <rect x="20.5" y="16.9" width="9" height="9" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="20.5" y="6.042" width="1.5" height="12" style={{ fill: `rgb(62, 107, 171)` }}></rect>
              <rect x="28" y="5.925" width="1.5" height="12" style={{ fill: `rgb(62, 107, 171)` }}></rect>
            </svg>
        <p className="ml-3">Detroit People Mover <span className="font-bold">(not in service)</span></p>
      </div>
      <div className="flex items-center bg-gray-100 p-3 border-b-2">
      <svg width={32} height={32}>
              <circle style={{ fill: "rgb(238, 77, 48)" }} cx="15" cy="15" r="12"></circle>
              <circle style={{ fill: "rgba(245, 245, 245, 1)" }} cx="15" cy="15" r="8"></circle>
              <rect
                x="15"
                y="33.018"
                width="4"
                height="15"
                style={{ fill: "rgb(238, 77, 48)" }}
                data-bx-origin="-0.000002 -2.918311"
                transform="matrix(0.707107, -0.707107, 0.707107, 0.707107, -18.953583, 5.088056)"
                ></rect>
            </svg>
        <p className="ml-3">QLine streetcar <span className="font-bold">(not in service)</span></p>
      </div>
    </Panel>
  )
}

export default MapLegend;