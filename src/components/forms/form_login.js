import React from 'react';

function FormLogin() {
        return (
            <form className="form-container">
                <header className="form-header">
                    <h3>Login</h3>
                </header>
                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email"></input>
                </div>
                <div className="form-input">
                    <label className="form-label">Senha</label>
                    <input type="password"></input>
                </div>
                <button className="form-button" onClick={() => {alert('Login realizado com sucesso!')}}>
                    Entrar
                </button>
                <a href="#">Esqueci minha senha</a>
            </form>
        );
}

export default FormLogin;
