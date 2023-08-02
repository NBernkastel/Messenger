import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles/register_card.css'
import Modal from './modal';

function RegisterForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password1: '', password2: '', email: '' })
  const [passdisplay1, setPassdisplay1] = useState('')
  const [passdisplay2, setPassdisplay2] = useState('')
  const [err, setErr] = useState('')
  const [modalOpen, setModalOpen] = useState(false);

  function adduser(e) {
    e.preventDefault()
    const usern = {username:user.username, email: user.email}
    axios.post('http://localhost:8000/auth/register/code',usern).then(function (response) {
      setModalOpen(true);
    })
      .catch(function (error) {
        setErr(error.response.data.detail)
        setUser({ username: '', password1: '', password2: '', email: '' })
        setPassdisplay1('')
        setPassdisplay2('')
      })
  }

  function checkpasseq() {
    if (user.password1 === user.password2) {
      return true
    } else {
      return false
    }
  }

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };

  return (
    <>
      <div className='register_card'>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <form>
          <div className='inputs'>
            <input type="text" className={
              (user.username.length > 3 && user.username.length < 50)
                ? "Username correct" :
                user.username.length !== 0 ?
                  "Username uncorrect" : "Username"}
              placeholder="Username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
            <input type="text" className={
              passdisplay1.length > 6
                ? "Pass correct" :
                passdisplay1.length !== 0 ?
                  "Pass uncorrect" : "Pass"}
              placeholder="Password" value={passdisplay1} onChange={e => {
                setUser({ ...user, password1: user.password1 + e.target.value.slice(-1) })
                setPassdisplay1(e.target.value.replace(/./g, '•'))
              }} />
            <input type="text" className='Pass' placeholder="Password" value={passdisplay2} onChange={e => {
              setUser({ ...user, password2: user.password2 + e.target.value.slice(-1) })
              setPassdisplay2(e.target.value.replace(/./g, '•'))
            }} />
            <input type="text" className="Email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
            <button type="primary" className='subBut' onClick={e => {
              if (checkpasseq())
                adduser(e)
              else {
                e.preventDefault()
                setErr("Passwords do not match")
                setUser({ username: '', password1: '', password2: '', email: '' })
                setPassdisplay1('')
                setPassdisplay2('')
              }
            }}>Sign in</button>
            <p className='Err'>{err}</p>
          </div>
        </form>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} username={user.username} password ={user.password1} email={user.email}/>
    </>
  )
}

export default RegisterForm;
