import React from 'react';

function SectionStatus(props) {
    return (
        <div className="container">
            <div className="d-inline-flex">
                <span className="subtitle">Status</span>
            </div>
            <div className="d-flex">
                <i className={`icon icon-${props.icon || 'plus'} mr-2 align-top`}/>
                <span>{props.status}</span>
            </div>
        </div>
    );
}

export default SectionStatus;