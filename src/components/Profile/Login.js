import React, {Component} from 'react';
import {setAuthToken} from '../../utils/auth';
import {Card, Input, Button, message} from 'antd';
import Store from '../../store';
import axios from 'axios';

const {Password} = Input;

class Login extends Component {
  state = {
    username: '',
    password: ''
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
    const {username, password} = this.state;

    return (
      <Card>
        <Input
          value={username}
          onChange={e => this.setState({ username: e.target.value })}
          placeholder='Username'
        />
        <Password
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          placeholder='Password'
        />
        <Button type='primary' onClick={this.handleLogin}>Login</Button>
      </Card>
    )
  }
}

export default Store.withStore(Login);
