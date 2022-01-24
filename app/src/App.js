import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { io } from "socket.io-client";
import './App.css';

function App() {

  useEffect(() => {
    // client-side, served on same domain
    const socket = io();

    // client-side
    socket.on("connect", () => {
      console.log(socket.connected); // true
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
