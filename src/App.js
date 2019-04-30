import React, {Component} from 'react';
import ItemList from './components/ItemList';
import Profile from './components/Profile';
import './App.css';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Redirect, Link, withRouter} from 'react-router-dom';
import Store from './store';
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

const PrivateRoute = ({component: ChildComponent, user, ...rest}) => {
  return <Route {...rest} render={props => {
    if (user == null) {
      return <Redirect to='/profile' />;
    } else {
      return <ChildComponent {...props} />;
    }
  }} />
}

class App extends Component {
  state = {
    collapsed: false
  }

	render() {
    const {store} = this.props;
    const user = store.get('user');

		return (
      <Router>
    		<div className='App'>
  				<Layout style={{ minHeight: '100vh' }}>
  					<Sider collapsible collapsed={this.state.collapsed} onCollapse={(collapsed) => this.setState({ collapsed })}>
  						<div className='App-logo'></div>
              <RoutedMenu />
  					</Sider>
  					<Content style={{ padding: 24 }}>
              <PrivateRoute user={user} path='/' exact={true} component={() => <div>{'test'}</div>} />
              <PrivateRoute user={user} path='/bins' exact={true} component={() => <div>{'bins'}</div>} />
              <PrivateRoute user={user} path='/items' exact={true} component={ItemList} />
              <Route path='/profile' exact={true} component={Profile} />
  					</Content>
  				</Layout>
    		</div>
      </Router>
		);
	}
}

export default Store.withStore(process.env.NODE_ENV === "development"
	? hot(App)
	: App);
