import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';

function ImageLink(props) {
    return (
        <div className="container">
            <Link to={props.to}>
                <Image
                    src={props.src} rounded
                />
                <Route path={`/${props.to}/`}/>
            </Link>
            <div className="d-flex">
                <span>{props.title}</span>
            </div>
            <div className="d-flex">
                <span>{props.subtitle}</span>
            </div>
        </div>
    );
}

export default ImageLink;