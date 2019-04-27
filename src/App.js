import React, {Component} from 'react';
import ItemList from './components/ItemList';
import Profile from './components/Profile';
import './App.css';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Redirect, Link, withRouter} from 'react-router-dom';
import {getCurrentUser, setCurrentUser} from './utils/auth';
import {Layout, Menu, Icon} from 'antd';
const {Content, Sider} = Layout;
const {Item} = Menu;

const RoutedMenu = withRouter(props => {
  const {location} = props;
  return (
    <Menu theme='dark' selectedKeys={[location.pathname]} mode='inline'>
      <Item key='/bins'>
        <Icon type='appstore-o' />
        <span>Bins</span>
        <Link to='/bins' />
      </Item>
      <Item key='/items'>
        <Icon type='tool' />
        <span>Items</span>
        <Link to='/items' />
      </Item>
      <Item key='/profile'>
        <Icon type='user' />
        <span>Profile</span>
        <Link to='/profile' />
      </Item>
    </Menu>
  )
});

const PrivateRoute = ({component: ChildComponent, authenticatedUser, ...rest}) => {
  return <Route {...rest} render={props => {
    if (authenticatedUser == null) {
      return <Redirect to='/profile' />;
    } else {
      return <ChildComponent {...props} />;
    }
  }} />
}

class App extends Component {
  state = {
    collapsed: false,
    authenticatedUser: null
  }

  getAuthenticatedUser = () => this.setState({ authenticatedUser: getCurrentUser() });

  setAuthenticatedUser = user => {
    setCurrentUser(user);
    this.setState({ authenticatedUser: user });
  }

  componentDidMount() {
    this.getAuthenticatedUser()
  }

	render() {
    const {authenticatedUser} = this.state;

		return (
      <Router>
    		<div className='App'>
  				<Layout style={{ minHeight: '100vh' }}>
  					<Sider collapsible collapsed={this.state.collapsed} onCollapse={(collapsed) => this.setState({ collapsed })}>
  						<div className='App-logo'></div>
              <RoutedMenu />
  					</Sider>
  					<Content style={{ padding: 24 }}>
              <PrivateRoute authenticatedUser={authenticatedUser} path='/' exact={true} component={() => <div>{'test'}</div>} />
              <PrivateRoute authenticatedUser={authenticatedUser} path='/bins' exact={true} component={() => <div>{'bins'}</div>} />
              <PrivateRoute authenticatedUser={authenticatedUser} path='/items' exact={true} component={ItemList} />
              <Route path='/profile' exact={true} component={() => <Profile authenticatedUser={authenticatedUser} setAuthenticatedUser={this.setAuthenticatedUser} />} />
  					</Content>
  				</Layout>
    		</div>
      </Router>
		);
	}
}

export default process.env.NODE_ENV === "development"
	? hot(App)
	: App;
