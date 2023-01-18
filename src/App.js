import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import {useStateValue} from "./StateProvider"

function App() {
  const [{user}, dispatch] = useStateValue();
  

  return (
    <div className="app">
      {! user ? (
        <Login/>
      ) : (
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
      )}
    </div>
  );
}

export default App;
