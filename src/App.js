import React from 'react';
import './App.scss';
import Login from './pages/Logon/Login';
import Restore from './pages/Logon/Restore';
import RedefinePassword from './pages/Logon/RedefinePassword';
import Dashboard from './components/layouts/Dashboard';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AuthContext from './context/auth-context';
import Logon from './components/layouts/Logon';
import Grades from './pages/Grade/Grades';
import Grade from './pages/Grade/Grade';
import Students from './pages/Student/Students';
import Student from './pages/Student/Student';
import Projects from './pages/Project/Projects';
import Project from './pages/Project/Project';
import Courses from './pages/Course/Courses';
import Course from './pages/Course/Course';
import User from './pages/User/User';
import Users from './pages/User/Users';
import Stats from './pages/Dashboard/Stats';
import usersApi from './services/api/users';

const PrivateRoute = ({path, children, ...rest}) => (
    <Route {...rest} render={(props) => 
      localStorage.getItem('token')
        ? children
        : <Redirect to='/auth' />
    } />
  )

const UserRoute = ({admin = false, ...rest}) => {
    let userType = localStorage.getItem('type');
    if (admin && userType !== 'admin') {
        return <Redirect to='/' />
    } 

    return <Route {...rest} />
}

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
            isLogin: true,
            user: null,
            loaded: false,
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        let email = localStorage.getItem("email");
        if(token && email) {
            this.setState({token: token, email: email});
        }
    }

    componentDidUpdate() {
        usersApi.getLogged().then((res) => {
            this.setState({user: res, loaded: true});
            localStorage.setItem('type', res.type);
        });
    }
  

    login = (token, email, tokenExpiration) => {
        this.setState({ token: token, email: email });
    }

    logout = () => {
        this.setState({ token: null, email: null});
        localStorage.removeItem('token');
        localStorage.removeItem('type');
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
                        <GuestRoute exact path='/auth'>
                            <Logon>
                                <Login />
                            </Logon>
                        </GuestRoute>
                        <GuestRoute exact path='/auth/recuperacao'>
                            <Logon>
                                <Restore />
                            </Logon>
                        </GuestRoute>
                        <GuestRoute exact path='/auth/redefinir-senha'>
                            <Logon>
                                <RedefinePassword />
                            </Logon>
                        </GuestRoute>
                        <PrivateRoute path='/'>
                            <Dashboard
                                    user_email={this.state.email || "Username"} 
                                    logout={this.logout}>
                                <Route exact path='/' component={Stats}></Route>
                                <Route exact path='/projetos' component={Projects}></Route>
                                <Route exact path='/projetos/:id' component={Project}></Route>
                                <Route exact path='/cursos' component={Courses}></Route>
                                <Route exact path='/cursos/:id' component={Course}></Route>
                                <Route exact path='/turmas' component={Grades}></Route>
                                <Route exact path='/turmas/:id' component={Grade}></Route>
                                <Route exact path='/alunos' component={Students}></Route>
                                <Route exact path='/alunos/:id' component={Student}></Route>
                                <UserRoute admin={true} exact path='/usuarios' component={Users} />
                                <Route exact path='/usuarios/:id' component={User}></Route>
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