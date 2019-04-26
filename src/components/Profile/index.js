import React, {Component} from 'react';
import {getCurrentUser} from '../../utils/auth';
import Login from './Login';

class Profile extends Component {
  render() {
    const currentUser = getCurrentUser();
    if (currentUser == null) return <Login />;

    return JSON.stringify(currentUser);
  }
}

export default Profile;
