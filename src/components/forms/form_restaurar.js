import React from 'react';

class FormRestaurar extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef()
    }

    submitHandler() {
        event.preventDefault();
        const url = new URL("http://api.sudotec.test/api/auth/password/email");
        const email = this.emailRef.current.value;
        
        if (email.trim().length === 0) {
            return;
        }

        let headers = {
            "Accept": "application/json",
        }

        let body = {
            email: email
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.status !== 200 && response.status !== 201) {
                throw new Error ("Couldn't find an account with this email!");
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
                    <h3>Restaurar Senha</h3>
                </header>
                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email" ref={this.emailRef}></input>
                </div>
                <button className="form-button" onClick={this.submitHandler}>
                    Restaurar
                </button>
            </form>
        );
    }
}

export default FormRestaurar;
