import React, { useEffect, useState } from 'react';
import { Card} from 'antd';
import Cookies from 'js-cookie';
import './styles/messenger.css';

function timeToNumber(time) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 * 60 + minutes * 60 + seconds;
}

function MessageForm({ user_to }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sended, setSended] = useState(false);
    const [socket, setSocket] = useState(null);
    const [menu, setMenu] = useState(-1)
    const [menuopen, setmenuOpen] = useState(true)
    const [mousepos, setMousPos] = useState([])

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8000/sockets/messenger');
        newSocket.onopen = () => {
            setSocket(newSocket);
            send_data(newSocket)
            newSocket.onmessage = (event) => {
                const mess = event.data;
                const message_obj = JSON.parse(mess);
                message_obj.messages.sort((a, b) => timeToNumber(a[1]) - timeToNumber(b[1]));
                message_obj.messages = message_obj.messages.slice(-12);
                setMessages(message_obj.messages);
                setMessage('');
            };
        };
        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, [user_to])

    async function send_data(sock) {
        const token = Cookies.get('token');
        let response = JSON.stringify({
            token: token,
            message: message,
            to: user_to
        });
        sock.send(response);
    }

    async function delete_message(index) {
        const token = Cookies.get('token');
        let response = JSON.stringify({
            token: token,
            message: message,
            to: user_to,
            id: messages[index][3],
        });
        socket.send(response);
        setMenu(false)
        }

    
    function oncontextMess(e, index){
        e.preventDefault()
        setMousPos([e.clientX,e.clientY])
        setMenu(index)
        setmenuOpen(!menuopen)

    }

    useEffect(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            send_data(socket)
            socket.onmessage = (event) => {
                const mess = event.data;
                const message_obj = JSON.parse(mess);
                message_obj.messages.sort((a, b) => timeToNumber(a[1]) - timeToNumber(b[1]));
                message_obj.messages = message_obj.messages.slice(-12);
                setMessages(message_obj.messages);
                setMessage('');
            };
        }
    }, [sended, user_to]);

    function handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            setSended(!sended);
        }
    }

    const onMenuStyle = {
        top: mousepos[1] + 'px',
        left: mousepos[0]+ 'px',
    }

    return (
        <Card bordered={false} className='messeng_card'>
            <div className="message-container">
                {messages.map((message, index) => (
                    <>
                    <div className={message[2] === 1 ? 'message_send' : 'message_get'} key={1 + index} onContextMenu={e => oncontextMess(e, index)}>
                        {message[0]}
                        <p>{message[1].slice(0, -3)}</p>
                    </div>
                    <div className='rmbmenu' hidden={(index != menu) || menuopen} onClick={e => delete_message(index)} key={-index} style={onMenuStyle}>delete</div> 
                    </>
                ))}
            </div>
            <form>
                <input className='message_post' onKeyDown={handleInputKeyPress} value={message} onChange={e => setMessage(e.target.value)}/>
                <button  className='subBut' onClick={(e) => {
                    e.preventDefault()
                    setSended(!sended)}}>Send</button>
            </form>
        </Card>
    );
}

export default MessageForm;
