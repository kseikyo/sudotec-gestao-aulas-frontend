import React from 'react';
import Input from './Input';

function SearchInput(props) {
    console.log(props);
    return (
        <div className='search-input'>
            <Input onChange={props.onChange} label='Pesquisar'></Input>
        </div>
    );
}

export default SearchInput;

