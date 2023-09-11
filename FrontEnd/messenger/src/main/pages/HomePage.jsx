import './styles/HomePage.css'
import React, { useEffect, useState } from 'react';

function Home() {
    const [scroll, setScroll] = useState(0)
    const [navstate, setNavstate] = useState([false, true, true, true])
    const [navmobilestate, setNavmobilestate] = useState(true)

    function handleScroll() {
        setScroll(window.scrollY)
    }

    function nvsk(deep) {
        window.scrollTo({
            top: deep,
            behavior: 'smooth', // Добавляет плавную анимацию прокрутки
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        if (scroll < 500) {
            setNavstate([false, true, true, true])
        }
        if (scroll > 500) {
            setNavstate([true, false, true, true])
        }
        if (scroll > 1600) {
            setNavstate([true, true, false, true])
        }
        if (scroll > 1800) {
            setNavstate([true, true, true, false])
        }
    }, [scroll])

    return (
        <div className='homepage'>
            <div className='main'>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter&family=Ubuntu&display=swap" rel="stylesheet" />
                <header className='homepageheader'>
                    <div className='nick'>
                        <p className="Nex">Nexe<span className="Land">Land</span></p>
                    </div>
                    <div className='navbar'>
                        <span onClick={e => nvsk(0)}>Main <hr hidden={navstate[0]} /></span>
                        <span onClick={e => nvsk(800)}>About Me <hr hidden={navstate[1]} /></span>
                        <span onClick={e => nvsk(1630)}>Projects <hr hidden={navstate[2]} /></span>
                        <span onClick={e => nvsk(2000)}>Contacts <hr hidden={navstate[3]} /></span>
                    </div>
                    <div className='navbar-mobile' onClick={e => {
                        if (navmobilestate) {
                        setNavmobilestate(false)
                        } else {
                        setNavmobilestate(true)
                        }
                    }
                    }>
                        <div className='nav-button'></div>
                        <div className='nav-button'></div>
                        <div className='nav-button2'></div>
                    </div>
                    <hr />
                </header>
                <div hidden={navmobilestate}>
                    <div className='navbar-mobile-links' hidden={navmobilestate}>
                        <span onClick={e => nvsk(0)}>Main</span>
                        <span onClick={e => nvsk(830)}>About Me</span>
                        <span onClick={e => nvsk(1800)}>Projects</span>
                        <span onClick={e => nvsk(2400)}>Contacts</span>
                    </div>
                </div>
                <div className='mainif'>
                    <div className='mainInfo'>
                        <p className='infp'>I'm <span className='infsp'>Nexeland</span></p>
                        <p className='infp'>Backend Developer</p>
                        <p className='moreinfo'>More information below</p>
                        <div className='mainButtons'>
                            <button className='hireme'>Hire Me</button>
                            <button className='cv'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.125C-2.41411e-08 12.6418 0.447715 12.25 1 12.25H13C13.5523 12.25 14 12.6418 14 13.125C14 13.6082 13.5523 14 13 14H1C0.447715 14 2.41411e-08 13.6082 0 13.125ZM3.29289 6.38128C3.68342 6.03957 4.31658 6.03957 4.70711 6.38128C5.21115 6.82232 6 6.46437 6 5.79461L6 0.875C6 0.391751 6.44771 2.11235e-08 7 0C7.55228 -2.11235e-08 8 0.39175 8 0.875L8 5.79461C8 6.46437 8.78885 6.82232 9.29289 6.38128C9.68342 6.03957 10.3166 6.03957 10.7071 6.38128C11.0976 6.72299 11.0976 7.27701 10.7071 7.61872L7.70711 10.2437C7.51957 10.4078 7.26522 10.5 7 10.5C6.73478 10.5 6.48043 10.4078 6.29289 10.2437L3.29289 7.61872C2.90237 7.27701 2.90237 6.72299 3.29289 6.38128Z" fill="white" />
                            </svg>Download CV</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='abm'>
                <div className='aboutMe'>
                    <img src="./img/about.jpg" alt="" />
                    <div className='aboutmetext'>
                        <span className='abouttitle'>About me</span>
                        <p className='aboutbody'>Hi! I am an experienced Backend developer with professional skills in creating
                            efficient and scalable web applications. I have a deep understanding of programming
                            languages such as Java, Python and Ruby,
                            as well as experience working with databases and version control systems.
                            My goal is to create reliable and secure solutions that can efficiently handle large
                            amounts of data. I am constantly improving my skills
                            and following the latest trends in the Backend development industry.
                            I like to solve complex problems and am always ready for new challenges.
                            In my portfolio you can find examples of my projects demonstrating my skills and approach
                            to development.
                            I will be glad to discuss the possibility of cooperation and make your idea a reality!</p>
                    </div>
                </div>
            </div>
            <div className='prj'>
                <div className='projects'>
                    <p className='prname'>Projects</p>
                    <div className='prjlist'>
                        <div className='prj1'>
                            <img src="./img/prj1.png" alt="" />
                            <div className='prj1text'>
                                <p className='prj1title'>Simple messenger</p>
                                <span className='prj1body'>Messenger for one-on-one dialogues, to use it you need to register and authorize via email, find another person in search, and start a conversation.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact'>
                <div className='contactme'>
                    <p className='cttitle'>Contact me</p>
                    <p className='ctbody'>If you are interested in my work or have any problems, do not hesitate to write to me!</p>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 34.087891 14.035156 C 33.403891 14.035156 32.635328 14.193578 31.736328 14.517578 C 30.340328 15.020578 13.920734 21.992156 12.052734 22.785156 C 10.984734 23.239156 8.9960938 24.083656 8.9960938 26.097656 C 8.9960938 27.432656 9.7783594 28.3875 11.318359 28.9375 C 12.146359 29.2325 14.112906 29.828578 15.253906 30.142578 C 15.737906 30.275578 16.25225 30.34375 16.78125 30.34375 C 17.81625 30.34375 18.857828 30.085859 19.673828 29.630859 C 19.666828 29.798859 19.671406 29.968672 19.691406 30.138672 C 19.814406 31.188672 20.461875 32.17625 21.421875 32.78125 C 22.049875 33.17725 27.179312 36.614156 27.945312 37.160156 C 29.021313 37.929156 30.210813 38.335938 31.382812 38.335938 C 33.622813 38.335938 34.374328 36.023109 34.736328 34.912109 C 35.261328 33.299109 37.227219 20.182141 37.449219 17.869141 C 37.600219 16.284141 36.939641 14.978953 35.681641 14.376953 C 35.210641 14.149953 34.672891 14.035156 34.087891 14.035156 z M 34.087891 16.035156 C 34.362891 16.035156 34.608406 16.080641 34.816406 16.181641 C 35.289406 16.408641 35.530031 16.914688 35.457031 17.679688 C 35.215031 20.202687 33.253938 33.008969 32.835938 34.292969 C 32.477938 35.390969 32.100813 36.335938 31.382812 36.335938 C 30.664813 36.335938 29.880422 36.08425 29.107422 35.53125 C 28.334422 34.97925 23.201281 31.536891 22.488281 31.087891 C 21.863281 30.693891 21.201813 29.711719 22.132812 28.761719 C 22.899812 27.979719 28.717844 22.332938 29.214844 21.835938 C 29.584844 21.464938 29.411828 21.017578 29.048828 21.017578 C 28.923828 21.017578 28.774141 21.070266 28.619141 21.197266 C 28.011141 21.694266 19.534781 27.366266 18.800781 27.822266 C 18.314781 28.124266 17.56225 28.341797 16.78125 28.341797 C 16.44825 28.341797 16.111109 28.301891 15.787109 28.212891 C 14.659109 27.901891 12.750187 27.322734 11.992188 27.052734 C 11.263188 26.792734 10.998047 26.543656 10.998047 26.097656 C 10.998047 25.463656 11.892938 25.026 12.835938 24.625 C 13.831938 24.202 31.066062 16.883437 32.414062 16.398438 C 33.038062 16.172438 33.608891 16.035156 34.087891 16.035156 z"></path>
                    </svg>
                </div>
            </div>
            <footer>
                <div className='footer'>
                    <div className='ft-leftbar'>
                        <div className='Logo'>
                            <p>Nexe<span>Land</span></p>
                        </div>
                        <p className='undwr'>Enjoy day!</p>
                    </div>
                    <div className='links'>
                        <div className='footer-links1'>
                            <p>Services</p>
                            <p>Support</p>
                            <p>Guarantee</p>
                            <p>Author</p>
                        </div>
                        <div className='footer-links2'>
                            <p>Services</p>
                            <p>Support</p>
                            <p>Guarantee</p>
                            <p>Author</p>
                        </div>
                        <div className='footer-links3'>
                            <p>Services</p>
                            <p>Support</p>
                            <p>Guarantee</p>
                            <p>Author</p>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    )
}

export default Home