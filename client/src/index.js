import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ChatPage from './pages/ChatPage.js';
import {socket, SocketContext} from './context/SocketContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <SocketContext.Provider value={socket}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<ChatPage />}/>
        <Route path="/landing" element={<LandingPage />}/>
        <Route path="/login" element={Login}/>
        <Route path="/register" element={Register}/>
        {/**Catch all routes */}
        <Route path='*' element={<p>404 Not found!</p>} />
      </Routes>
    </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
