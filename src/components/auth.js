import React from 'react';

function Auth(props) {
  return (
    <div id="auth" className="bg-white">
        <div id="auth-form" className="align-self-center">
          {props.children}
        </div>
        <div id="auth-layout">
          <div className="v-center">
            <img src="/images/logo-white.png" className="img-fluid mb-4" width="200px"></img>
            <hr className="bg-white my-3"></hr>
            <h1>Gerenciamento de Aulas</h1>
          </div>
        </div>
    </div>
  )
}

export default Auth;
