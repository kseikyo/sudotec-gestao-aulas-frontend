import React from 'react';

function Hamburguer(props) {
        return (
            <div className="hamburguer-button" onClick={props.toggle}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        );
}

export default Hamburguer;