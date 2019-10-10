import React from 'react';
import AuthContext from '../../context/auth-context';
import Logon from '../../components/layouts/logon';
import { BrowserRouter as Route, NavLink } from "react-router-dom";

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
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
                    throw new Error('Authentication failed');
                    //Don't know how we are gonna handle it on frontend yet
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData.access_token) {
                    localStorage.setItem("token", responseData.access_token);
                    localStorage.setItem("email", email);
                    this.context.login(responseData.access_token, email);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Logon>
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
                <NavLink to="Forgotten-Password">
                    <span>Esqueci minha senha.</span>
                    <Route path="Forgotten-Password" />
                </NavLink>
            </Logon>
        );
    }
}

export default FormLogin;
