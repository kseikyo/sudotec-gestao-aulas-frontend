import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Stickybar from './components/stickybar';
import FormLogin from './components/form_login';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Stickybar />
    </div>
  );
}

export default App;