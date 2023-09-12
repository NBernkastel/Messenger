import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MessengerPage from './pages/MessengerPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/mess" element={<MessengerPage/>} />
      </Routes>
    </>
  );
}

export default App;