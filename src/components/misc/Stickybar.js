import React from 'react';
import Hamburguer from './HamburguerButton';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

class Stickybar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarToggled: false,
        }
        this.fetchToggle = this.fetchToggle.bind(this);
    }

    fetchToggle() {
        let app = document.querySelector("#app");

        if (!this.state.isSidebarToggled) {
            app.classList.add('sidebar-hidden')
        } else {
            app.classList.remove('sidebar-hidden')
        }

        this.setState({
            isSidebarToggled: !this.state.isSidebarToggled
        });

    }

    render() {

        return (
            <Navbar bg="light" expand="lg" className="sticky-bar">
                <div>
                    <Hamburguer toggle={this.fetchToggle} />
                </div>
                <Breadcrumb className="mr-auto">
                    <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>
                <NavDropdown title={this.props.user_email}>
                    <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        );
    }
}

export default Stickybar;