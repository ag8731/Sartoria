import React, {Component} from 'react';
import axios from 'axios';
import Store from '../store';
import BinCreator from './BinCreator';
import {Card, Button, Empty, Dropdown, Menu, Icon} from 'antd';
import ItemCard from './ItemCard';
import ItemCreator from './ItemCreator';

class ItemList extends Component {
	state = {
    bin: null,
		showItemCreator: false,
    showBinCreator: false
	}

	getAllItems = () => {
    const {store, match} = this.props;

    axios.get('/api/items/', {
      params: {
        owner: store.get('user').id,
        bin: match.params.binId
      }
    }).then(res => {
		  store.set('items')(res.data);
	  });
  }

  getCurrentBin = () => {
    const {store, match} = this.props;

    if (match.params.binId == null) return;

    axios.get(`/api/bins/${match.params.binId}`, {
      params: {
        owner: store.get('user').id
      }
    }).then(res => {
      this.setState({ bin: res.data });
    });
  }

  componentDidMount() {
    this.getAllItems();
    this.getCurrentBin();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.binId !== prevProps.match.params.binId) {
      this.getAllItems();
      this.getCurrentBin();
    }
  }

  renderItems = () => {
    const items = this.props.store.get('items');

    if (items.length === 0) return <Empty description='No Items' />;

    return items.map(item => (
      <ItemCard key={item.id} data={item} showBin={this.props.match.params.binId == null}/>
    ));
  }

	render() {
    const {bin, showBinCreator, showItemCreator} = this.state;

		return (
			<div>
        <Card className='section-header'>
          <span className='title'>{bin != null ? bin.name : 'Items'}</span>
          {(bin != null && bin.description != null) && <span className='description'>{bin.description}</span>}
          <Button.Group style={{ float: 'right' }}>
            {bin != null && <Dropdown overlay={
              <Menu>
                <Menu.Item
                  onClick={() => this.setState({ showBinCreator: true })}
                >
                  <Icon type='edit' />
                  <span>Edit Bin</span>
                </Menu.Item>
                <Menu.Item
                >
                  <Icon type='delete' />
                  <span>Delete Bin</span>
                </Menu.Item>
              </Menu>
            }>
              <Button icon='setting' />
            </Dropdown>}
            <Button
              icon='filter'
              onClick={console.log}
            />
            <Button
              icon='plus'
              type='primary'
              onClick={() => this.setState({ showItemCreator: true })}
            />
          </Button.Group>
        </Card>
        <div className='item-grid'>
          {this.renderItems()}
        </div>
        <ItemCreator
					actions={{
						getAllItems: this.getAllItems,
						hideItemCreator: () => this.setState({ showItemCreator: false })
					}}
					visible={showItemCreator}
          currentBin={+this.props.match.params.binId}
				/>
        {bin != null && <BinCreator
          actions={{
            refreshParent: this.getCurrentBin,
						hideBinCreator: () => this.setState({ showBinCreator: false })
					}}
					visible={showBinCreator}
          currentBin={bin}
        />}
			</div>
		);
	}
}

export default Store.withStore(ItemList);
