import React from 'react';
import './App.scss';
import FormLogin from './pages/Logon/Login';
import Dashboard from './components/layouts/Dashboard';
import { BrowserRouter} from 'react-router-dom';
import AuthContext from './context/auth-context';
// import Projects from './pages/Project/Projects';
import Grade from './pages/Grade/Grade';

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
        let email = localStorage.getItem("email");
        if(token && email)
            this.setState({token: token, email: email});
        
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
                <React.Fragment>
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
                                <Dashboard
                                    user_email={this.state.email || "Username"} 
                                    logout={this.logout}>
                                    <Grade/>
                                </Dashboard>
                            }
                        </div>
                    </AuthContext.Provider>
                </React.Fragment>
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