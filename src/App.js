import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Stickybar from './components/stickybar';
import FormLogin from './components/form_login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarToggled : true
        }
        this.fetchToggle = this.fetchToggle.bind(this);
    }

    fetchToggle() {
        console.log(this.state);
        
        new Promise((resolve, reject) => {
            this.setState({
                isSidebarToggled: !this.state.isSidebarToggled
            });
            resolve();
        })
            .then(() => {
                let container = document.querySelector(".container");
                this.state.isSidebarToggled ? container.style.left = "0px" : container.style.left = "-300px";
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        console.log(this.fetchToggle);
        
        return (
            <div className="App">
                <Sidebar />
                <Stickybar fetchToggle={this.fetchToggle}/>
            </div>
        );
    }
}

export default App;