import React from 'react';
import './App.scss';
import FormLogin from './pages/Logon/Login';
import Dashboard from './components/layouts/Dashboard';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AuthContext from './context/auth-context';
// import Projects from './pages/Project/Projects';
import Grades from './pages/Grade/Grades';
import Grade from './pages/Grade/Grade';
import Students from './pages/Student/Students';
import Student from './pages/Student/Student';

const PrivateRoute = ({path, children, ...rest}) => (
    <Route {...rest} render={(props) => 
      localStorage.getItem('token')
        ? children
        : <Redirect to='/auth' />
    } />
  )
const GuestRoute = ({path, children, ...rest}) => (
<Route render={(props) => 
    localStorage.getItem('token')
    ? <Redirect to='/' />
    : children
} />
)

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
        localStorage.removeItem('token');
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
                    <div id='app'>
                    <Switch>
                        <GuestRoute path='/auth'><FormLogin /></GuestRoute>
                        <PrivateRoute path='/'>
                            <Dashboard
                                    user_email={this.state.email || "Username"} 
                                    logout={this.logout}>
                                <Route exact path='/turmas' component={Grades}></Route>
                                <Route exact path='/turmas/:id' component={Grade}></Route>
                                <Route exact path='/alunos' component={Students}></Route>
                                <Route exact path='/alunos/:id' component={Student}></Route>
                            </Dashboard>
                        </PrivateRoute>
                    </Switch>
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