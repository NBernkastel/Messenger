import { Button, Input } from 'antd';
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import './styles/register_card.css'

function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' })
  const [passdisplay, setPassdisplay] = useState('')
  const [err, setErr] = useState('')

  function gettoken(e) {
    e.preventDefault()
    axios.post('http://localhost:8000/auth/login', user).then(function (response) {
      Cookies.set("token", response.data, { expires: 7 });
      navigate('/');
    })
      .catch(function (error) {
        setErr(error.response.data.detail)
        setUser({ username: '', password: '' })
        setPassdisplay('')
      })

  }

  return (
    <div className='register_card'>
      <form>
        <div className='inputs'>
          <input className={
            (user.username.length > 3 && user.username.length < 50)
             ? "Username correct" :
              user.username.length !== 0 ?
               "Username uncorrect" : "Username"} placeholder="Username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
          <input className={
            passdisplay.length > 6
             ? "Pass correct" :
             passdisplay.length !== 0 ?
               "Pass uncorrect" : "Pass"} placeholder="Password" value={passdisplay} onChange={e => {
            setUser({ ...user, password: user.password + e.target.value.slice(-1) })
            setPassdisplay(e.target.value.replace(/./g, '•'))
          }} />
          <p className='Err'>{err}</p>
          <Button type="primary" className='subBut' onClick={gettoken}>Sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
