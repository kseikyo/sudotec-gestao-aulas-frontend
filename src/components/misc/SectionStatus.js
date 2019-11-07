import React from 'react';


function SectionStatus(props) {
    return (
        <div className="container section-status">
            <div className="d-inline-flex">
                <span className="title">Status</span>
            </div>
            <div className="d-flex">
                <i className={`icon icon-${props.icon || 'plus'} mr-2 align-top title`}/>
                <span className="title">{props.status}</span>
            </div>
        </div>
    );
}

export default SectionStatus;