import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MessageForm from '../components/messageForm';
import axios from 'axios';
import { Avatar, Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;


function MessengerPage() {
  const [user, setUser] = useState({username:''})
  const [users, setUsers] = useState([])
  const [user_to, setUserTo] = useState(null)
  const [currentDialog, setCurrentDialog] = useState(null)
  const [Items, setItems] = useState()

  useEffect(() => {
    const token = Cookies.get("token");
    axios.get('http://localhost:8000/users/current_user', {headers: {Authorization: `Bearer ${token}`,},})
    .then((response) => {
        setUser(response.data);
      });
    axios.get('http://localhost:8000/users/users', {headers: {Authorization: `Bearer ${token}`,},})
    .then((response) => {
      setUsers(response.data)
      setItems(response.data.map((user, index) => ({
        key: index,
        label: user,
      })))
    });
  }, []);

  const handleUserSelection = (selectedUser) => {
    if (currentDialog !== selectedUser.label) {
      setUserTo(selectedUser.label);
      setCurrentDialog(selectedUser.label);
    }
  };

  function user_search(e) {
    const User = {
      username: e.target.value
    }
    axios.post('http://localhost:8000/users/user_search', User).then((response) => {
      if (e.target.value !== '') {
        setItems(response.data.map((user, index) => ({
          key: index,
          label: user,
        })))
      }
      else {
        setItems(users.map((user, index) => ({
          key: index,
          label: user,
        })))
      }
    });
  }

  return (
    <div className="page">
      <Header className="Head">
        <input type="text" className='SearchInput' onChange={e => user_search(e)} />
      </Header>
      <Layout className='lay'>
        <Sider trigger={null} collapsible theme='light' className='sider'>
          <div className="vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            items={Items}
            onClick={(e) => handleUserSelection(Items[e.key])}
            className="menu"
          />
        </Sider>
        <Layout>
          <Content className='MessContent'>
            {user_to ? (<MessageForm user_to={user_to} />) : (<div className='EnterMessegerPage'>Select dialogue</div>)}
          </Content>
        </Layout>
      </Layout>
      <div className="User">
          <p>{user.username}</p>
        </div>
        <div className="Avatar">
          {user.username ? <img src={'http://localhost:8000/avatars/'+user.username+'.jpg'} alt="Restored Image" width={48} height={48} /> : null}
        </div>
    </div>
  );
}

export default MessengerPage;
