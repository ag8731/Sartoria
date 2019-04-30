import React, {Component} from 'react';
import axios from 'axios';
import Store from '../../store';
import {Card, Button} from 'antd';
import Item from './Item';
import ItemCreator from './ItemCreator';

class ItemList extends Component {
	state = {
    bin: null,
		showItemCreator: false
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

  renderItems = () => this.props.store.get('items').map(item => (
    <Item key={item.id} data={item} showBin={this.props.match.params.binId == null}/>
  ));

	render() {
    const {bin} = this.state;

		return (
			<div>
        <Card className='section-header'>
          <span className='title'>{bin != null ? bin.name : 'Items'}</span>
          {(bin != null && bin.description != null) && <span className='description'>{bin.description}</span>}
          <Button.Group style={{ float: 'right' }}>
            <Button
              icon='plus'
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
					visible={this.state.showItemCreator}
          currentBin={+this.props.match.params.binId}
				/>
			</div>
		);
	}
}

export default Store.withStore(ItemList);
