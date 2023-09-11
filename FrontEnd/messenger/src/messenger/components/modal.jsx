import React, { useState } from 'react';
import './styles/modal.css'
import axios from 'axios';

const Modal = ({ isOpen, onClose, username, password, email}) => {
  const [incode, setCode] = useState('');

    function codeCheck(){
      console.log(incode)
      const User = {
        username: username,
        password: password,
        email: email,
        code: incode
      };
      axios.post('http://localhost:8000/auth/register/', User).then(function (response) {
        if (response.data)
          onClose()
      }
      )
    }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Enter code from your email</p>
        <input type="text" className='modalInput' value={incode} onChange={e => setCode(e.target.value)}/>
      </div>
      <button className='modalButton' onClick={codeCheck}>Submit</button>
    </div>
  );
};

export default Modal;
