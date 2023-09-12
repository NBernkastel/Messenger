import React from 'react'
import './styles/homepage.css'
import { useNavigate } from 'react-router-dom';


function HomePage() {

    const navigate = useNavigate();
    return (
        <div className='home'>
            <div className='homebuttons'>
                <div onClick={e=>{navigate('./login')}}>
                    Login
                </div>
                <div onClick={e=>{navigate('./register')}}>
                    Register
                </div>
                <div onClick={e=>{navigate('./mess')}}>
                    Messenger
                </div>
            </div>
        </div>
    )
}

export default HomePage;