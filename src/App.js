import React, {Component} from 'react';
import ItemList from './components/ItemList';
import './App.css';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
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
    </Menu>
  )
});

class App extends Component {
  state = {
    collapsed: false
  }

	render() {
		return (
      <Router>
    		<div className='App'>
    				<Layout style={{ minHeight: '100vh' }}>
    					<Sider collapsible collapsed={this.state.collapsed} onCollapse={(collapsed) => this.setState({ collapsed })}>
    						<div className='App-logo'></div>
                <RoutedMenu />
    					</Sider>
    					<Content style={{ padding: 24 }}>
                <Route path='/' exact={true} component={() => <div>{'test'}</div>} />
                <Route path='/bins' exact={true} component={() => <div>{'bins'}</div>} />
                <Route path='/items' exact={true} component={ItemList} />
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
