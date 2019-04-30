import React, {Component} from 'react';
import Store from '../store';
import {Menu, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

const {Item, SubMenu} = Menu;

class RoutedMenu extends Component {
  getAllBins = () => {
    const {store} = this.props;

    axios.get('/api/bins', {
      params: {
        owner: store.get('user').id
      }
    }).then(res => {
  		store.set('bins')(res.data);
  	});
  }

  componentDidMount() {
    this.getAllBins()
  }

  renderBinList = () => this.props.store.get('bins').map(bin => (
    <Item key={`/bins/${bin.id}`}>
      <span>{bin.name}</span>
      <Link to={`/bins/${bin.id}`} />
    </Item>
  ))

  render() {
    const {location} = this.props;

    return (
      <Menu theme='dark' selectedKeys={[location.pathname]} mode='inline'>
        <SubMenu key='/bins' title={<span><Icon type='dropbox' /><span>Bins</span></span>}>
          {this.renderBinList()}
        </SubMenu>
        <Item key='/items'>
          <Icon type='skin' />
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
  }
}

export default Store.withStore(withRouter(RoutedMenu));
