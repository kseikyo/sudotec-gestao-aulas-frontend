import React from 'react';
import {NavLink} from 'react-router-dom';

function MenuItem({exact = false, ...props}) {
    return (
        <NavLink exact={exact} activeClassName='is-active' to={props.link} style={{ textDecoration: 'none'}}>
            <li className="nav-item menu-item" style={{ cursor: "pointer" }}>
                <div className="nav-icon"><i className={`icon-${props.icon}`}></i></div>
                <span>{props.span}</span>
            </li>
        </NavLink>
    );
}

export default MenuItem;