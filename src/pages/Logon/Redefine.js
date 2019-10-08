import React from 'react';

class FormRedefine extends React.Component {
    constructor(props) {
        super(props);
        this.firstPass  = React.createRef();
        this.secondPass = React.createRef(); 
    }
    
    static contextType = AuthContext;

    submitHandler() {
        const url = new URL("http://api.sudotec.test/api/auth/password/reset");
        const firstPass  = this.firstPass.current.value;
        const secondPass = this.secondPass.current.value;

        if(firstPass !== secondPass) {
            //Show to the user the passwords are different
            return;
        }

        let headers = {
            "Accept": "application/json"
        }

        let body = {
            token: this.context.token,
            email: this.context.email,
            password: firstPass,
            password_confirmation: secondPass
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.status !== 200 && response.status !== 201) {
                throw new Error ('Something failed');
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
                    <h3>Redefinir Senha</h3>
                </header>
                <div className="form-input">
                    <label className="form-label" >Senha</label>
                    <input type="password" ref={this.firstPass}></input>
                </div>
                <div className="form-input">
                    <label className="form-label">Senha</label>
                    <input type="password" placeholder="Digite a senha novamente" ref={this.secondPass}></input>
                </div>
                <button className="form-button" onClick={this.submitHandler}>
                    Redefinir
                </button>
            </form>
        );
    }
}

export default FormRedefine;
