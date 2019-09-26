import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Stickybar from './components/stickybar';
import FormLogin from './components/forms/form_login';
import Content from './components/content';
import AuthContext from './context/auth-context';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarToggled: false,
            token: null,
            isLogin: true
        }
        this.fetchToggle = this.fetchToggle.bind(this);
    }

    login = (token, tokenExpiration) => {
        this.setState({ token: token });
    }

    logout = () => {
        this.setState({ token: null });
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
            <BrowserRouter>
                <>
                    <AuthContext.Provider
                        value={{
                            token: this.state.token,
                            login: this.login,
                            logout: this.logout
                        }}>
                        <div id="app">
                            {this.state.isLogin ? <FormLogin isLogin={this.state.isLogin} />
                                : <div id="root">
                                    <Sidebar state={this.state.isSidebarToggled} />
                                    <div id="app-content">
                                        <Stickybar fetchToggle={this.fetchToggle} />
                                        <Content />
                                    </div>
                                </div>
                            }
                        </div>
                    </AuthContext.Provider>
                </>
            </BrowserRouter>
        );
    }
}

export default App;