import React from 'react';
import {Route, Routes} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MessengerPage from './pages/MessengerPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/mess" element={<MessengerPage/>} />
      </Routes>
    </>
  );
}

export default App;