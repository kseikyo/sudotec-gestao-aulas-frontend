import React from 'react';

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

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
            "username": email,
            "password": password
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        })
        .then(response => {
            if(response.status !== 200 && response.status !== 201) {
                throw new Error ('Authentication failed');
                //Don't know how we are gonna handle it on frontend yet
            }
            return response.json();
        })
        .then(responseData => {
            //Loggin the json data
            console.log(responseData);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <form className="form-container">
                <header className="form-header">
                    <h3>Login</h3>
                </header>
                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email" ref={this.emailRef}></input>
                </div>
                <div className="form-input">
                    <label className="form-label">Senha</label>
                    <input type="password" ref={this.passwordRef}></input>
                </div>
                <button className="form-button" onClick={this.submitHandler}>
                    Entrar
                </button>
                <a href="#">Esqueci minha senha</a>
            </form>
        );
    }
}

export default FormLogin;
