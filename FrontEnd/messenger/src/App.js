import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './main/pages/HomePage';
import Messenger from './messenger/Messenger';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/messenger/*" element={<Messenger/>} />
      </Routes>
    </>
  );
}

export default App;