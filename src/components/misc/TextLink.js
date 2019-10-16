import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";

function TextLink(props) {
    return (
        <Link to={props.to} className="text-link" >
             <span>{props.span}</span>
            <Route path={props.path} />
        </Link>
    );
}

export default TextLink;