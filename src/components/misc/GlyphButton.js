import React from 'react';
import {Button} from 'react-bootstrap';

function GlyphButton(props) {
    return (
        <Button variant={props.variant} className="glyph-button">
          <i className={`icon icon-${props.icon || 'plus'} mr-2 align-top`}></i>
          {props.children}
        </Button>
    );
}

export default GlyphButton;