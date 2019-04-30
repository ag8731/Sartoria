import React, {Component} from 'react';
import Login from './Login';
import {setAuthToken} from '../../utils/auth';
import Store from '../../store';
import {Button} from 'antd';

class Profile extends Component {
  handleLogout = () => {
    const {store} = this.props;

    store.set('user')(null);
    setAuthToken(null);
  }

  render() {
    const {store} = this.props;
    const user = store.get('user');
    if (user == null) return <Login />;

    return (
      <div>
        <div>
          {JSON.stringify(user)}
        </div>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    );
  }
}

export default Store.withStore(Profile);
