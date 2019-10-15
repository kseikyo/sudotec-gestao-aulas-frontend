import React from 'react';

function Content({children, className, ...props}) {
    return(
        <div className={`content-block ${className}`} {...props}>
            {children}
        </div>
    );
}

export default Content;