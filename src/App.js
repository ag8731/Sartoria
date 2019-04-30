import React, {Component} from 'react';
import ItemList from './components/ItemList';
import Profile from './components/Profile';
import './App.css';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Store from './store';
import RoutedMenu from './components/RoutedMenu';
import {Layout} from 'antd';
const {Content, Sider} = Layout;

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
              <PrivateRoute user={user} path='/' exact={true} component={() => <div>{'root'}</div>} />
              <PrivateRoute user={user} path='/bins' exact={true} component={() => <div>{'bins'}</div>} />
              <PrivateRoute user={user} path='/bins/:binId' exact={true} component={ItemList} />
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
