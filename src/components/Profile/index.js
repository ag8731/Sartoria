import React, {Component} from 'react';
import Login from './Login';
import {setAuthToken} from '../../utils/auth';
import Store from '../../store';
import {Card, Button, Icon} from 'antd';

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
        <Card className='section-header'>
          <span className='title'>{`Hi, ${user.first_name} ${user.last_name}!`}</span>
          <span className='description'>Thanks for using Sartoria.</span>
          <Button.Group style={{ float: 'right' }}>
            <Button type='danger' onClick={this.handleLogout}>Logout</Button>
          </Button.Group>
        </Card>
        <div>
          <Card
            title={<span><Icon type='user' className='label'/>Username</span>}
          >
            {user.username}
          </Card>
          <Card
            className='sub'
            title={<span><Icon type='mail' className='label'/>Email Address</span>}
          >
            {user.email}
          </Card>
        </div>
      </div>
    );
  }
}

export default Store.withStore(Profile);
