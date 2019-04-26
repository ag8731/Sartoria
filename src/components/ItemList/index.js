import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button} from 'antd';
import Item from './Item';
import ItemCreator from './ItemCreator';

class ItemList extends Component {
	state = {
		items: [],
		showItemCreator: false
	}

	getAllItems = () => axios.get('/api/items/').then(res => {
		this.setState({ items: res.data });
	});

	componentDidMount() {
		this.getAllItems();
	}

  renderItems = () => this.state.items.map(item => (
    <Item key={item.id} data={item} />
  ));

	render() {
		return (
			<div>
        <Card className='section-header'>
          <span className='title'>{'Items'}</span>
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
				/>
			</div>
		);
	}
}

export default ItemList;
