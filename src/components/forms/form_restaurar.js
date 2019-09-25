import React from 'react';

function FormRestaurar() {
        return (
            <form className="form-container">
                <header className="form-header">
                    <h3>Restaurar Senha</h3>
                </header>
                <div className="form-input">
                    <label className="form-label">Email</label>
                    <input type="email"></input>
                </div>
                <button className="form-button" onClick={() => {alert('Email enviado para restaurar a senha')}}>
                    Restaurar
                </button>
            </form>
        );
}

export default FormRestaurar;
