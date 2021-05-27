import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PanelHeader = ({ title, subtitle, icon, textSize="base" }) => {
  return (
    <h1 className={`flex items-center justify-between py-2 px-1 text-gray-800 text-${textSize}`}>
      <FontAwesomeIcon icon={icon} />
      <div>
        <p className="font-semibold break-word text-right">{title}</p>
        {subtitle && <p className="break-word text-right text-sm">{subtitle}</p>}
      </div>
    </h1>
  )
}

export const Panel = ({ width='full', style, children }) => {
  let className = "bg-gray-300 border-b-8 border-l-8 border-r-8 border-gray-300 mr-2"
  return (
  <div className={`${className} w-${width}`}>
    {children}
  </div>
)}