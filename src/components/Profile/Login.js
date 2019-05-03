import React, {Component} from 'react';
import {setAuthToken} from '../../utils/auth';
import {Card, Input, Button, message} from 'antd';
import Store from '../../store';
import axios from 'axios';
import Register from './Register';

const {Password} = Input;

class Login extends Component {
  state = {
    username: '',
    password: '',
    isRegistering: false
  }

  handleLogin = () => {
    const {username, password} = this.state;
    const {store} = this.props;

    if (username.length === 0 || password.length === 0) {
			message.error('Username and password are both required.');
			return;
		}

    axios.post('/api/auth/login/', {
      username,
      password
    }).then(res => {
      const {user, token} = res.data;
      store.set('user')(user);
      setAuthToken(token);
    }).catch(err => message.error('Invalid username or password.'));
  }

  render() {
    const {username, password, isRegistering} = this.state;

    if (isRegistering) {
      return (
        <Register cancelRegistering={() => this.setState({ isRegistering: false })} />
      );
    }

    return (
      <div className='login-view'>
        <Card title='Welcome to Sartoria!' style={{ width: '50%' }}>
          <Input
            className='login-field'
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            placeholder='Username'
          />
          <Password
            className='login-field'
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder='Password'
          />
          <div className='login-actions'>
            <Button className='register' onClick={() => this.setState({ isRegistering: true })}>Register</Button>
            <Button type='primary' onClick={this.handleLogin}>Login</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default Store.withStore(Login);
