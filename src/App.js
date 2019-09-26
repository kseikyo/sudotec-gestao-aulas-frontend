import React from 'react';
import './App.css';
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
            isLogin: true
        }
        this.fetchToggle = this.fetchToggle.bind(this);
    }

    fetchToggle() {

        new Promise((resolve, reject) => {

            let container = document.querySelector(".container");
            let stickybar = document.querySelector(".navbar");


            if (this.state.isSidebarToggled) {
                // Setting the width and left back to the default
                container.style.left = "0";
                container.style.width = "260px";
                stickybar.style.width = "calc(100% - 260px)";
            } else {
                /* It is needed to set the width and left style from the container to make the stickybar
                 * use the actual 100% of the width. 
                 * But now the animations are now at the same time.
                 */
                container.style.left = "-260px";
                stickybar.style.width = "100%";
                container.style.width = "0px";

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
            <div className="App">
                {
                this.state.isLogin ? <FormLogin />
                : <div> 
                <Sidebar state={this.state.isSidebarToggled} />
                <div>
                    <Content />
                    <Stickybar fetchToggle={this.fetchToggle} />
                </div> 
                </div>
                }
            </div>
        );
    }
}

export default App;