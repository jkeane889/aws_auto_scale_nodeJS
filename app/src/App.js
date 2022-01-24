import React from 'react';
import logo from './logo.svg';
import { io } from "socket.io-client";
import './App.css';

function App() {
  // client-side, served on same domain
  const socket = io('/', {
    reconnection: true,
    reconnectionAttempts: 500,
    reconnectionDelayMax: 5000,
    reconnectionDelay: 1000,
    transports: ['websocket'],
  });

  console.log('attempting to connect socket')

  // client-side
  socket.on("connect", () => {
    console.log('connecting to socket')
    console.log(socket.connected); // true
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

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
