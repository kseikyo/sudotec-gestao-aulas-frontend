import React from 'react';
import './App.scss';
import FormLogin from './components/forms/form_login';
import Dashboard from './components/dashboard';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/auth-context';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            email: null,
            isLogin: true
        }
    
    }

    login = (token, email, tokenExpiration) => {
        this.setState({ token: token, email: email });
    }

    logout = () => {
        this.setState({ token: null, email: null});
    }


    render() {

        return (
            <BrowserRouter>
                <>
                    <AuthContext.Provider
                        value={{
                            token: this.state.token,
                            email: this.state.email,
                            login: this.login,
                            logout: this.logout
                        }}>
                        <div id="app">
                            {this.state.isLogin ? <FormLogin isLogin={this.state.isLogin} />
                                : <Dashboard/>
                            }
                        </div>
                    </AuthContext.Provider>
                </>
            </BrowserRouter>
        );
    }
}

export default App;

/**
 * const inputs = document.getElementsByClassName('form-control');

function floatLabel(element) {
  if (element.value) {
    element.classList.add('filled');
  } else {
    element.classList.remove('filled');
  }
}

Array.from(inputs).forEach(function(element) {
  floatLabel(element);
  element.addEventListener('input', () => {
    floatLabel(element);
  });
});
 */