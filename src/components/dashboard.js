import React from 'react';
import Sidebar from './sidebar';
import Stickybar from './stickybar';
import Content from './content';
import '../styles/content.scss';

class Dashboard extends React.Component {
    render() {
        return(
          <div id="root"> 
            <Sidebar/>
            <div id="app-content">
                <Stickybar/>
                
                <div className="content-container">
                  <Content/>
                </div>
            </div> 
          </div>
        );
    }
}

export default Dashboard;