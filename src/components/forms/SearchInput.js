import React from 'react';
import Input from './Input';

function SearchInput({...rest}) {
    return (
        <div className='search-input'>
            <Input {...rest} label='Pesquisar'></Input>
        </div>
    );
}

export default SearchInput;

