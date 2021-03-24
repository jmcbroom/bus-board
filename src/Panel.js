import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PanelHeader = ({ title, icon }) => {
  return (
    <h1 className="flex items-center justify-between py-2 px-1 text-gray-800">
      <FontAwesomeIcon icon={icon} />
      <span className="font-semibold">{title}</span>
    </h1>
  )
}

export const Panel = ({ width='1/2', style, children }) => {
  let className = "bg-gray-300 border-b-8 border-l-8 border-r-8 border-gray-300 mt-3 mr-2"
  return (
  <div className={`${className} w-${width}`}>
    {children}
  </div>
)}