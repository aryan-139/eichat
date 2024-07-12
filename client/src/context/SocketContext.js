import React, { createContext } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8001');

const SocketContext = createContext(socket);

export { socket, SocketContext };
