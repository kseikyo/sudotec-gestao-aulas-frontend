import React from 'react';

export default function AdminBlock({children}) {
  if (localStorage.getItem('type') === 'admin') {
    return (<>{children}</>)
  }

  return (<></>);
}