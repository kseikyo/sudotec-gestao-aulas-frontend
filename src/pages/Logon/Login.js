import React from 'react';
import AuthContext from '../../context/auth-context';
import TextLink from '../../components/misc/TextLink';
import {Redirect} from 'react-router-dom'

const RedirectIfLogged = ({logged}) => {
    if (!logged) {
        return <></>
    }

    return <Redirect to='/' push />
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();

        this.state = {
            logged: false,
        }
    }

    static contextType = AuthContext;

    submitHandler = (event) => {
        event.preventDefault();
        const url = new URL("http://api.sudotec.test/api/auth/login");
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        let body = {
            email: email,
            password: password
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    alert('Dados incorretos.');
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData.access_token) {
                    localStorage.setItem("token", responseData.access_token);
                    localStorage.setItem("email", email);
                    this.context.login(responseData.access_token, email);
                    this.setState({logged: true});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <RedirectIfLogged logged={this.state.logged}/>           
                <form className="form-container text-center">
                    <header className="form-header">
                        <h2>Login</h2>
                    </header>
                    <div className="form-group">
                        <input className="form-control" type="email" ref={this.emailRef}></input>
                        <label>Email</label>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" ref={this.passwordRef}></input>
                        <label className="form-label">Senha</label>
                    </div>
                    <button className="btn btn-primary w-100" onClick={this.submitHandler}>
                        Entrar
                    </button>
                </form>
                
                <TextLink  to="/auth/recuperacao" span="Esqueci minha senha." path="/auth/recuperacao"/>
            </>
        );
    }
}

export default Login;
