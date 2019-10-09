import React from 'react';
import Hamburguer from './hamburguer_button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
class Stickybar extends React.Component {
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

        return (
            <div className="navbar navbar-light sticky-bar">
                <div>
                    <Hamburguer toggle={this.fetchToggle} />
                </div>
                <Breadcrumb className="mr-auto">
                    <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}


{/* <nav aria-label="breadcrumb" className="mr-auto">
<ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Home</li>
</ol>
</nav> */}

export default Stickybar;