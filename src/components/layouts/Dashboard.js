import React from 'react';
import Sidebar from '../misc/Sidebar';
import Stickybar from '../misc/Stickybar';

class Dashboard extends React.Component {
    
    render() {
        return(
          <div id="dashboard"> 
            <Sidebar/>
            <div id="app-content">
                <Stickybar user_email={this.props.user_email} logout={this.props.logout}/>
                <div className="content-container">
                  {this.props.children}
                </div>
            </div> 
          </div>
        );
    }
}

export default Dashboard;