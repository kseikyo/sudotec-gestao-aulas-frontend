import React from 'react';
import '../styles/stickybar.scss';

function Hamburguer() {
        return (
            <div className="hamburguer-button" onClick={() => { this.props.fetchToggle() }}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        );
}

export default Hamburguer;