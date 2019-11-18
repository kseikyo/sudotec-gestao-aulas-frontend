import React from 'react';
import { ReactComponent as Logo } from './../../assets/sudotec.svg';

export default function Loader({message = 'Carregando...', size = '60px'}) {
  return (
    <div className='loader'>
      <div className='loader-logo' style={{width: size}}>
        <Logo />
      </div>
      <div className='loader-text'>{message}</div>
    </div>
  );
}