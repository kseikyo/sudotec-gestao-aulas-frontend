import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap';

function SearchInput(props) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Append>
                <Button variant="primary">
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
}

export default SearchInput;

