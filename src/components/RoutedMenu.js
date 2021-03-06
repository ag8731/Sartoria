import React, {Component} from 'react';
import Store from '../store';
import {Menu, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import BinCreator from './BinCreator';

const {SubMenu} = Menu;

class RoutedMenu extends Component {
  state = {
    showBinCreator: false
  }

  getAllBins = () => {
    const {store} = this.props;
    const user = store.get('user');

    if (user == null) {
      store.set('bins')([]);
      return;
    };

    axios.get('/api/bins', {
      params: {
        owner: user.id
      }
    }).then(res => {
  		store.set('bins')(res.data);
  	});
  }

  componentDidMount() {
    this.getAllBins()
  }

  componentDidUpdate(prevProps) {
    const {store} = this.props;
    const prevStore = prevProps.store;
    const currentUser = store.get('user') || { id: null };
    const prevUser = prevStore.get('user') || { id: null };
    if (currentUser.id !== prevUser.id) {
      this.getAllBins();
    }
  }

  renderBinList = () => this.props.store.get('bins').map(bin => (
    <Menu.Item key={`/bins/${bin.id}`}>
      <span>{bin.name}</span>
      <Link to={`/bins/${bin.id}`} />
    </Menu.Item>
  ))

  render() {
    const {showBinCreator} = this.state;
    const {location, store} = this.props;

    return (
      <Menu theme='dark' selectedKeys={[location.pathname]} mode='inline'>
        <SubMenu key='/bins' title={<span><Icon type='dropbox' /><span>Bins</span></span>}>
          {this.renderBinList()}
          {store.get('user') != null && <Menu.Item
            onClick={() => this.setState({ showBinCreator: true })}
          >
            <span><Icon type='plus'/>Bin</span>
          </Menu.Item>}
        </SubMenu>
        <Menu.Item key='/items'>
          <Icon type='skin' />
          <span>Items</span>
          <Link to='/items' />
        </Menu.Item>
        <Menu.Item key='/profile'>
          <Icon type='user' />
          <span>Profile</span>
          <Link to='/profile' />
        </Menu.Item>
        <BinCreator
          actions={{
            refreshParent: this.getAllBins,
						hideBinCreator: () => this.setState({ showBinCreator: false })
					}}
					visible={showBinCreator}
        />
      </Menu>
    )
  }
}

export default Store.withStore(withRouter(RoutedMenu));
