import React from 'react';
import '../styles/stickybar.css';
import Hamburguer from './hamburguer_button';

function Stickybar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
                <Hamburguer fetchToggle={props.fetchToggle}/>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                </nav>
        </nav>
    );
}

export default Stickybar;