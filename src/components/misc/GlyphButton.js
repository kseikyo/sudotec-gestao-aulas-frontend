import React from 'react';
import {Button} from 'react-bootstrap';

function GlyphButton(props) {
    return (
        <Button onClick={props.click} variant={props.variant} className={`glyph-button shadow-sm ${props.className}`}>
          <i className={`icon icon-${props.icon || 'plus'} mr-2 align-top`}></i>
          {props.children}
        </Button>
    );
}

export default GlyphButton;