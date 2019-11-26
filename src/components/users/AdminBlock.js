import React from 'react';
import {Redirect} from 'react-router-dom'

export default function AdminBlock({children}) {
  if (localStorage.getItem('type') === 'admin') {
    return (<>{children}</>)
  }

  return (<></>);
}