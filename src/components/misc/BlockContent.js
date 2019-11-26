import React from 'react';

function BlockContent({children, className, ...props}) {
    return(
        <div className={`block-content ${className}`} {...props}>
            {children}
        </div>
    );
}

export default BlockContent;