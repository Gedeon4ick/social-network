import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Sidebar/>}/>
          </Routes>
          <Routes>
            <Route path="/rooms/:roomId" element={<><Sidebar/><Chat/></>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
