import React from 'react';
import './App.scss';
import FormLogin from './components/forms/form_login';
import Dashboard from './components/dashboard';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            userId: null,
            isLogin: false
        }
    }

    render() {

        return (
            <div id="app">
                { this.state.isLogin ? <FormLogin />
                : <Dashboard/>
                }
            </div>
        );
    }
}

export default App;