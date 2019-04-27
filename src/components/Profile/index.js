import React, {Component} from 'react';
import Login from './Login';
import {setAuthToken} from '../../utils/auth';
import {Button} from 'antd';

class Profile extends Component {
  handleLogout = () => {
    const {setAuthenticatedUser} = this.props;

    setAuthenticatedUser(null);
    setAuthToken(null);
  }

  render() {
    const {authenticatedUser, setAuthenticatedUser} = this.props;
    if (authenticatedUser == null) return <Login authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />;

    return (
      <div>
        <div>
          {JSON.stringify(authenticatedUser)}
        </div>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    );
  }
}

export default Profile;
