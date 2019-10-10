import React from 'react';
import {BrowserRouter as Route, NavLink} from 'react-router-dom';

function MenuItem(props) {
    return (
        <NavLink activeClassName='is-active' to={props.span} style={{ textDecoration: 'none'}}>
            <li className="nav-item menu-item" style={{ cursor: "pointer" }}>
                <div className="nav-icon"><i className={`icon-${props.icon}`}></i></div>
                <span>{props.span}</span>
            </li>
            <Route path={`/${props.span}/`}/>
        </NavLink>
    );
}

export default MenuItem;