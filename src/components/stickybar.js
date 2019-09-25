import React from 'react';
import '../styles/stickybar.css';

function Stickybar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
                <div className="hamburguer-button">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                </nav>
        </nav>
    );
}

export default Stickybar;