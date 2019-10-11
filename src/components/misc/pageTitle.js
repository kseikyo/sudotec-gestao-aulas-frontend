import React from 'react';

function PageTitle(props) {
    return (
        <div>
            <h3>
                {props.courseTitle}
            </h3>
            <span>
                {props.projectTitle}
            </span>
        </div>
    );
}

export default PageTitle;