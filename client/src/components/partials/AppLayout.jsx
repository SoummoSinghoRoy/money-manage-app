import React from 'react';
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const AppLayout = () => {
	return(
		<div className="container">
      <div className='row'>
        <div className='col'>
          <Navigation />
          <Outlet />
        </div>
      </div>   
		</div>
	)
}

export default AppLayout;