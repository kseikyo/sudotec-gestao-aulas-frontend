import React from 'react';
import './App.scss';
import FormLogin from './pages/Logon/Login';
import Dashboard from './components/layouts/dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthContext from './context/auth-context';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       fakeAuth.isAuthenticated === true
//         ? <Component {...props} />
//         : <Redirect to='/login' />
//     )} />
//   )

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            email: null,
            isLogin: true
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if(token)
            this.setState({token: token});
        
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
                            {!this.state.token ? <FormLogin isLogin={this.state.isLogin} />
                                : 
                                <Dashboard></Dashboard>
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