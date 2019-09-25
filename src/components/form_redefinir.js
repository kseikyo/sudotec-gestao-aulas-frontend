import React from 'react';

function FormRedefinir() {
        return (
            <form className="form-container">
                <header className="form-header">
                    <h3>Redefinir Senha</h3>
                </header>
                <div className="form-input">
                    <label className="form-label">Senha</label>
                    <input type="password"></input>
                </div>
                <div className="form-input">
                    <label className="form-label">Senha</label>
                    <input type="password" placeholder="Digite a senha novamente"></input>
                </div>
                <button className="form-button" onClick={() => {alert('Senha redefinida com sucesso!')}}>
                    Redefinir
                </button>
            </form>
        );
}

export default FormRedefinir;
