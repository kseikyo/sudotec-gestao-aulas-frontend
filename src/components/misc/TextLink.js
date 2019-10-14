import React from 'react';
import { BrowserRouter as Route, NavLink } from "react-router-dom";

function TextLink(props) {
    return (
        <NavLink to={props.to}>
             <span>{props.span}</span>
            <Route path={props.path} />
        </NavLink>
    );
}

export default TextLink;