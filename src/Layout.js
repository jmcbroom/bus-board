import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, title = null }) => {
  return (
    <div>
      <div className="text-lg p-2 bg-blue-100 flex items-center justify-between">
        <h1 >Bus board</h1>
        <div className="w-1/4 flex justify-between">
          <Link to="/">Front page</Link>
          <Link to="/configuration">Configuration</Link>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Layout;