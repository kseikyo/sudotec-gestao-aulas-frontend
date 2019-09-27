import React from 'react';
import Sidebar from './sidebar';
import Stickybar from './stickybar';
import Content from './content';
import '../styles/content.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isSidebarToggled: false,
    }
    this.fetchToggle = this.fetchToggle.bind(this);
  }

  fetchToggle() {

    new Promise((resolve, reject) => {
        let app = document.querySelector("#app");

        if (this.state.isSidebarToggled) {
            app.classList.add('sidebar-hidden')
        } else {
            app.classList.remove('sidebar-hidden')

        }
        resolve();
    })
        .then(() => {
            this.setState({
                isSidebarToggled: !this.state.isSidebarToggled
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
          <div id="root"> 
            <Sidebar/>
            <div id="app-content">
                <Stickybar fetchToggle={this.fetchToggle} />
                
                <div className="content-container">
                  <Content/>
                </div>
            </div> 
          </div>
        );
    }
}

export default Dashboard;