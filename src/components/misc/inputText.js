import React from 'react';
import { InputGroup } from 'react-bootstrap';

function InputText(props) {
    return (
        <InputGroup className="mb-3">
            <FormControl
                aria-label={props.aria-label}
                aria-describedby="inputGroup-sizing-default"
            />
        </InputGroup>
    );
}

export const InputText = InputText;