import React from 'react';

function PageTitle(props) {
    return (
        <div className='page-title'>
            <h3 className='title'>
                {props.title}
            </h3>
            <span className='subtitle'>
                {props.subtitle}
            </span>
        </div>
    );
}

export default PageTitle;
