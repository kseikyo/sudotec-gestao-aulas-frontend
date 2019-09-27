import React from 'react';
import '../styles/stickybar.scss';
import Hamburguer from './hamburguer_button';

function Stickybar(props) {
    return (
        <div className="navbar navbar-light sticky-bar">
            <Hamburguer fetchToggle={props.fetchToggle}/>
            <nav aria-label="breadcrumb" className="mr-auto">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
        </div>
    );
}

export default Stickybar;