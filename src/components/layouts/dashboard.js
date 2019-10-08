import React from 'react';
import Sidebar from '../misc/sidebar';
import Stickybar from '../misc/stickybar';

class Dashboard extends React.Component {
    render() {
        return(
          <div id="dashboard"> 
            <Sidebar/>
            <div id="app-content">
                <Stickybar/>
                <div className="content-container">
                  {this.props.children}
                </div>
            </div> 
          </div>
        );
    }
}

export default Dashboard;