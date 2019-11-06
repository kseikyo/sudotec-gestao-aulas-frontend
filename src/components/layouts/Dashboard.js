import React from 'react';
import Sidebar from '../misc/Sidebar';
import Stickybar from '../misc/Stickybar';

function Dashboard(props) {
  return(
    <div id="dashboard"> 
      <Sidebar/>
      <div id="app-content">
          <Stickybar user_email={props.user_email} logout={props.logout}/>
          <div className="content-container">
            {props.children}
          </div>
      </div> 
    </div>
  );
}

export default Dashboard;