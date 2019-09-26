import React from 'react';
import './App.scss';
import Sidebar from './components/sidebar';
import Stickybar from './components/stickybar';
import FormLogin from './components/forms/form_login';
import Content from './components/content';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarToggled: false,
            token: null,
            userId: null,
            isLogin: false
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
            <div id="app">
                { this.state.isLogin ? <FormLogin />
                : <div id="root"> 
                    <Sidebar state={this.state.isSidebarToggled} />
                    <div id="app-content">
                        <Stickybar fetchToggle={this.fetchToggle} />
                        <Content/>
                    </div> 
                 </div>
                }
            </div>
        );
    }
}

export default App;