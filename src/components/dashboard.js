import React from 'react';
import Sidebar from './sidebar';
import Stickybar from './stickybar';
import Content from './content';

class Dashboard extends React.Component {
    render() {
        return(
          <div id="dashboard"> 
            <Sidebar/>
            <div id="app-content">
                <Stickybar/>
                
                <div className="content-container">
                  <Content>
                    content
                  </Content>
                </div>
            </div> 
          </div>
        );
    }
}

export default Dashboard;