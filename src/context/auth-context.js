import React from 'react';

export default React.createContext({
    token: null,
    email: null,
    login: (token, email, tokenExpiration) => {
    
    },
    logout: () =>{

    }
});