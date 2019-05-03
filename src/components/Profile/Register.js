import React, {Component} from 'react';
import {setAuthToken} from '../../utils/auth';
import {Card, Input, Button, message} from 'antd';
import Store from '../../store';
import axios from 'axios';

const {Password} = Input;

class Register extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  handleRegister = () => {
    const {username, password, firstName, lastName, email} = this.state;
    const {store, history} = this.props;

    if (username.length === 0 || password.length === 0) {
			message.error('All fields are required.');
			return;
		}

    axios.post('/api/auth/register/', {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email
    }).then(res => {
      const {user, token} = res.data;
      store.set('user')(user);
      setAuthToken(token);
    }).catch(err => message.error('There was an error. Please ensure your email is valid. Otherwise, please try a different username.'));
  }

  render() {
    const {username, password, firstName, lastName, email} = this.state;
    const {cancelRegistering} = this.props;

    return (
      <div className='login-view'>
        <Card title='Thanks for joining Sartoria!' style={{ width: '50%' }}>
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
          <Input
            className='login-field'
            value={firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
            placeholder='First Name'
          />
          <Input
            className='login-field'
            value={lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
            placeholder='Last Name'
          />
          <Input
            className='login-field'
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder='Email Address'
          />
          <div className='login-actions'>
            <Button className='cancel' onClick={cancelRegistering}>Cancel</Button>
            <Button type='primary' onClick={this.handleRegister}>Register</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default Store.withStore(Register);
